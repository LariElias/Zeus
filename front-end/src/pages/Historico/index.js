
import React from "react";
import './favoritos.css';
import HistoricPrice from "../../components/HistoricPrice/index.js";
import Header2 from "../../components/Header2/index.js";
const Historico = () => {

  return (
    <div className="home-all">
      <Header2 className="header" />
      <div className="home-top">
        
        <h1 className="labelHistorico">Gráfico de Gastos e Histórico de Rações</h1>
        <h3 className="msg1">Acesse o gráfico de gastos mensais e veja o histórico completo de rações, com filtro por mês.</h3>
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