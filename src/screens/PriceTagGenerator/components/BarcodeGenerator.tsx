import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

function BarcodeGenerator({ value }: { value: string }) {
  const renderElementRef = useRef(null);

  useEffect(() => {
    JsBarcode(renderElementRef.current, value, {
      background: 'transparent',
      margin: 0,
      height: 30,
      width: 1.2,
      fontSize: 8,
      displayValue: false,
    });
  }, [value]);

  return <svg ref={renderElementRef} />;
}

export default BarcodeGenerator;
