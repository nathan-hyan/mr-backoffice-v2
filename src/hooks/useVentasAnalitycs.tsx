import { useEffect, useState } from 'react';
import { Product, Venta } from 'types/data';

import { useVentas } from '~contexts/Sells';

type Period = 'daily' | 'weekly' | 'monthly';

export interface AnalyticsResult {
  total: number;
  totalCost: number;
  profit: number;
  byDepartment: Record<string, number>;
  byCategory: Record<string, number>;
  bySubcategory: Record<string, number>;
  topProducts: { name: string; sold: number }[];
  totalSalesCount: number;
}

function getPeriodFilter(period: Period, selectedDate: Date | null) {
  const now = selectedDate || new Date();
  return (venta: Venta) => {
    const [day, month, year] = venta.orderDate.split('/');
    const ventaDate = new Date(`${year}-${month}-${day}`);
    if (period === 'daily') {
      return (
        ventaDate.getDate() === now.getDate() &&
        ventaDate.getMonth() === now.getMonth() &&
        ventaDate.getFullYear() === now.getFullYear()
      );
    }
    if (period === 'weekly') {
      const dayOfWeek = now.getDay() || 7;
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - dayOfWeek + 1);
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);
      return ventaDate >= weekStart && ventaDate <= weekEnd;
    }
    if (period === 'monthly') {
      return (
        ventaDate.getMonth() === now.getMonth() &&
        ventaDate.getFullYear() === now.getFullYear()
      );
    }
    return true;
  };
}

export function useVentasAnalytics(
  period: Period,
  products: Product[],
  selectedDate: Date | null
) {
  const { fetchAllVentas } = useVentas();
  const [analytics, setAnalytics] = useState<AnalyticsResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchAllVentas().then((ventas) => {
      const filtered = ventas.filter(getPeriodFilter(period, selectedDate));
      const totalSalesCount = filtered.length;

      const total = filtered.reduce((acc, v) => acc + v.totalPrice, 0);

      let totalCost = 0;
      const byDepartment: Record<string, number> = {};
      const byCategory: Record<string, number> = {};
      const bySubcategory: Record<string, number> = {};
      const productCounter: Record<string, number> = {};

      filtered.forEach((venta) => {
        venta.items.forEach((item) => {
          const prod = products.find(
            (p) => p.name === item.name || p.id === item.id
          );

          if (prod?.prices?.cost?.value) {
            totalCost += prod.prices.cost.value * item.quantity;
          }

          if (prod?.category) {
            byDepartment[prod.category] =
              (byDepartment[prod.category] || 0) + item.total;
          }
          if (prod?.subCategory) {
            byCategory[prod.subCategory] =
              (byCategory[prod.subCategory] || 0) + item.total;
          }
          if (prod?.subSubCategories) {
            bySubcategory[prod.subSubCategories] =
              (bySubcategory[prod.subSubCategories] || 0) + item.total;
          }

          productCounter[item.name] =
            (productCounter[item.name] || 0) + item.quantity;
        });
      });

      const topProducts = Object.entries(productCounter)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([name, sold]) => ({ name, sold }));

      setAnalytics({
        total,
        totalCost,
        profit: total - totalCost,
        byDepartment,
        byCategory,
        bySubcategory,
        topProducts,
        totalSalesCount,
      });
      setLoading(false);
    });
  }, [period, fetchAllVentas, products, selectedDate]);

  return { analytics, loading };
}
