import React, { useRef, useEffect } from "react";
import SmilesDrawer from "smiles-drawer";

const SETTINGS = {
  width: 400,
  height: 200,
};

const SmileDrawerContainer = ({ smilesStr }) => {
    const imgRef = useRef(null);
    const drawer = new SmilesDrawer.SmiDrawer(SETTINGS); // Inicialize o drawer com opções

  useEffect(() => {
    if (imgRef.current) {
      // Certifique-se de que o imgRef está definido antes de usá-lo
      drawer.draw(smilesStr, imgRef.current, 'light');
    }
  }, [smilesStr, drawer]); // Re-executar o efeito se smilesStr ou drawer mudar

  return (
    <div>
      <img ref={imgRef} width={SETTINGS.width} height={SETTINGS.height} alt="SMILES structure" />
    </div>
  );
};

export default SmileDrawerContainer;

