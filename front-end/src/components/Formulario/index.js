import React from "react";
import { useState, useEffect } from "react";

import api from "../../services/api";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './formulario.css';

const Formulario = () => {
  const [posts, setPosts] = useState([]);
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [kg, setKg] = useState('');

  const clear = () => {
    setBrand('');
    setPrice('');
    setKg('');
  };

  const createFood = async (e) => {
    e.preventDefault();
    try {
      // Verificações de entrada
      if (!brand.trim() || !kg.trim() || !price.trim()) {
        alert('Por favor, preencha todos os campos.');
        return;
      }
      
      const parsedKg = parseFloat(kg);
      const parsedPrice = parseFloat(price);

      if (isNaN(parsedKg) || isNaN(parsedPrice) || parsedKg <= 0 || parsedPrice <= 0) {
        alert('Por favor, insira valores válidos para o peso e preço.');
        return;
      }

      if (parsedKg < 0 || parsedPrice < 0) {
        alert('Não são permitidos valores negativos para o peso e preço.');
        return;
      }

      await api.post('/Food', {
        brand: brand,
        kg: parsedKg,
        price: parsedPrice
      });
      
      alert('Ração cadastrada com sucesso!');
      getPosts();
      clear();
    } catch (error) {
      console.error('Erro ao tentar adicionar ração:', error);
      alert('Um erro ocorreu ao adicionar a ração.');
    }
  };

  const getPosts = async () => {
    try {
      const response = await api.get("/Food");
      setPosts(response.data);
    } catch (error) {
      console.error("Erro ao obter as postagens:", error);
      alert("Um erro ocorreu ao obter as postagens.");
    }
  };

  useEffect(() => {
    getPosts();
  }, []);


  return (
    <div>triste</div>
  )
};

export default Formulario;