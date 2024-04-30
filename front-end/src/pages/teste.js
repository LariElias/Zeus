import Header2 from "../../components/Header2";
import './home.css';
import Formulario from "../../components/Formulario"
import Historic from "../../components/Historic"
import Back from '../../assets/Back.png'
import React,{useEffect , useState} from "react";
import api from "../../services/api";
const Home = () => {


  return (
    <div className="home-all">
      
      <Header2 className="header"/>
      <div className="home-top">
        <h1 className="bem-vindo">Seja Bem-vindo a <span className="marca"> PetFeed Manager </span></h1>
        <h3 className="msg">Cadastre as rações dos seus pets e veja as últimas postagens. Simples assim!</h3>
      </div>
     
      <div className="FormularioAndHistoric">
    
      <div className="formulario-container">
        <Formulario/>
      </div>
      <div className="historic-container">
        <Historic />
      </div>
      </div>
    </div>
  )
}
export default Home;
