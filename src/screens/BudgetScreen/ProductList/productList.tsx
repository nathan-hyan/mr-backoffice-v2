import { Product } from 'types/data';

import ProductItem from './ProductItem/productItem';

interface ProductListProps {
  selectedProducts: Product[]; // Cambié el nombre de selectedProduct por selectedProducts
  selectedPriceType: string;
}

function ProductList({
  selectedProducts, // Aquí ya recibimos los productos y el tipo de precio directamente desde el padre
  selectedPriceType,
}: ProductListProps) {
  const handleRemoveProduct = (productId: string) => {
    // Eliminación de producto, si fuera necesario
    // Esto dependerá de cómo deseas manejar el estado de los productos seleccionados
  };

  return (
    <div>
      {selectedProducts.length === 0 ? (
        <p>No hay productos seleccionados.</p>
      ) : (
        selectedProducts.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            selectedPriceType={selectedPriceType}
            onRemove={handleRemoveProduct}
          />
        ))
      )}
    </div>
  );
}

export default ProductList;
