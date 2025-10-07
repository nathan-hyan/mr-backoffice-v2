import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

function BarcodeGenerator({ value }: { value: string }) {
  const renderElementRef = useRef(null);

  useEffect(() => {
    JsBarcode(renderElementRef.current, value, {
      background: 'transparent',
      margin: 0,
      height: 80,
      width: 1.3,
      fontSize: 10,
      displayValue: false,
    });
  }, [value]);

  return <svg ref={renderElementRef} />;
}

export default BarcodeGenerator;
