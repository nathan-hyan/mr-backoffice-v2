import { createCanvas } from 'canvas';
import JsBarcode from 'jsbarcode';

export default function generateBarcodeImage(code: string): string {
  const canvas = createCanvas();
  JsBarcode(canvas, code, { format: 'CODE128' });
  return canvas.toDataURL('image/png');
}
