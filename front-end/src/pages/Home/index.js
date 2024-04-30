import Header2 from "../../components/Header2";
import './home.css';
import React,{useEffect , useState} from "react";

const Home = () => {


  return (
    <div className="home-all">
      
      <Header2 className="header"/>
      <div className="home-top">
        <h1 className="bem-vindo">Seja Bem-vindo a <span className="marca"> PetFeed Manager </span></h1>
        <h3 className="msg">Cadastre as rações dos seus pets e veja as últimas postagens. Simples assim!</h3>
      </div>

      
    </div>
  )
}
export default Home;
