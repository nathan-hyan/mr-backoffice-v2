import { Product } from 'types/data';

import LabelModel1 from './components/Model1/Model1';
import LabelModel2 from './components/Model2/Model2';
import LabelModel3 from './components/Model3/Model3';

interface Props {
  model: string;
  product: Product;
  size: string;
  copies: number;
}

function LabelRenderer({ model, product, size, copies }: Props) {
  if (!product || !model || copies < 1) return null;

  switch (model) {
    case 'Codigo de barras':
      return <LabelModel1 product={product} size={size} copies={copies} />;
    case 'Precio unitario':
      return <LabelModel2 product={product} size={size} copies={copies} />;
    case 'Por Mayor':
      return <LabelModel3 product={product} size={size} copies={copies} />;
    default:
      return null;
  }
}

export default LabelRenderer;
