import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

function BarcodeGenerator({ value }: { value: string }) {
  const renderElementRef = useRef(null);

  useEffect(() => {
    JsBarcode(renderElementRef.current, value, {
      background: 'transparent',
      margin: 0,
      height: 30,
      width: 1.3,
      fontSize: 10,
    });
  }, [value]);

  return <svg ref={renderElementRef} />;
}

export default BarcodeGenerator;
