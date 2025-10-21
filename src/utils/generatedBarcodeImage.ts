import { createCanvas } from 'canvas';
import JsBarcode from 'jsbarcode';

export default function generateBarcodeImage(code: string): string {
  const canvas = createCanvas(220, 100);
  JsBarcode(canvas, code, {
    format: 'CODE128',
    displayValue: true,
    text: `COD.BARRA: ${code}`,
    fontSize: 14,
    textAlign: 'center',
    textMargin: 3,
    margin: 0,
    width: 1.5,
  });

  return canvas.toDataURL('image/png');
}
