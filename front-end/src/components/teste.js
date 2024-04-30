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
    <div className="container1">
      <Card className="CardFormulario">
        <Card.Header className="cardHead1">Formulário</Card.Header>
        <Card.Body color="#B5CBB7">
          <Card.Title>Insira os dados da Ração</Card.Title>
          <div className='addfood'>
            <Form>
              <Form.Group className="setbrand" controlId="brand">
                <Form.Label>Marca</Form.Label>
                <Form.Control
                  maxLength={15}
                  placeholder="digite a marca"
                  name="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value.replace(/[^\w\s]/gi, ''))}
                  required
                />
              </Form.Group>

              <Form.Group className="setprice" controlId="price">
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  maxLength={6}
                  name="price"
                  value={price}
                  placeholder="digite o preço"
                  onChange={(e) => setPrice(e.target.value)}
                  // onChange={(e) => {
                  //   const newValue = e.target.value.replace(/[^0-9.]/g, '');
                  //   if (parseFloat(newValue) > 1000) {
                      
                  //     alert("nao é permitido valores acima de R$1000.00")
                  //   } else {
                  //     setPrice(newValue);
                  //   }
                  // }}
                  required
                />
              </Form.Group>
              <Form.Group className="setkg" controlId="kg">
                <Form.Label>Peso(kg)</Form.Label>
                <Form.Control
                  maxLength={6}
                  name="kg"
                  placeholder="digite o kg"
                  value={kg}
                  onChange={(e) => {
                    const newValue = e.target.value.replace(/[^0-9.]/g, '');
                    if (parseFloat(newValue) > 1000) {
                      
                      alert("nao é permitido valores acima de R$1000.00")
                    } else {
                      setKg(newValue);
                     
                    }
                  }}
                  required
                />
              </Form.Group>
              <br />
              <Button classname="butonForm" onClick={createFood}>
                Cadastrar
              </Button >
            </Form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Formulario;