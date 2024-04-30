
import React from "react";
import './favoritos.css';
import HistoricPrice from "../../components/HistoricPrice/index.js";
import Header2 from "../../components/Header2/index.js";
const Historico = () => {

  return (
    <div className="home-all">
      <div className="home-top">
        <Header2 className="header" />
        <h1 className="labelHistorico">Consulte os dados coletados</h1><br />
      </div>
      <div className="FormularioAndHistoric">
        <div className="historic-container">
          <HistoricPrice />
        </div>
      </div>
    </div>

    
  )
}

export default Historico;