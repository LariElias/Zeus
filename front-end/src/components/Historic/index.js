import { useState, useEffect } from "react";
import React from "react";
import api from "../../services/api.js";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";
import Card from 'react-bootstrap/Card';
import ModalTest from "../modalEdit/index.js"

import './Historic.css';


const Historic = () => {
    const [openModal, setOpenModal] = useState(false);
    const [posts, setPosts] = useState([]);
    const [brand, setBrand] = useState('');
    const [editedBrand, setEditedBrand] = useState('');
    const [editedPrice, setEditedPrice] = useState('');
    const [editedKg, setEditedKg] = useState('');
    const [idTest, setIdTest] = useState('');

    const getPosts = async () => {
        try {
            const response = await api.get("/Food");
            setPosts(response.data);
        } catch (error) {
            console.error("Erro ao obter os posts:", error);
            alert("Ocorreu um erro ao tentar obter os posts");
        }
    };

    const deleteFood = async (_id) => {
        try {
            if (!window.confirm("Você tem certeza que deseja excluir o item?")) return;
            await api.delete(`/Food/${_id}`);
            alert("A ração foi deletada com sucesso!");
            getPosts();
        } catch (error) {
            console.error("Erro ao tentar apagar a ração:", error);
            alert("Ocorreu um erro ao tentar apagar a ração");
        }
    };

    const editFood = async (_id) => {
        try {
            if (parseFloat(editedPrice) < 0 || parseFloat(editedKg) < 0) {
                alert("Preço e peso não podem ser negativos");
                return;
            }
            await api.put(`/Food/${_id}`, {
                brand: editedBrand,
                price: editedPrice,
                kg: editedKg
            });
            alert("A ração foi atualizada com sucesso!");
            setOpenModal(false);
            getPosts();
        } catch (error) {
            console.error('Erro ao atualizar a ração:', error);
            alert('Um erro aconteceu ao tentar atualizar a ração');
        }
    };

    const clear = () => {
        setEditedBrand('');
        setEditedPrice('');
        setEditedKg('');
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="">
            <div className='Recentes'>
                <Card className="cardHistotico">
                    <Card.Header className="cardHeader2">
                        Recentes
                    </Card.Header>
                    <Card.Header className="cardHeader2">
                        <h2 className="postsLabel ">Rações cadastradas</h2>
                    </Card.Header>
                    <Card.Header className="actions">
                        <th>Ações</th>
                        <th>Marca</th>
                        <th>Preço</th>
                        <th>Peso</th>
                        <th>Data</th>
                    </Card.Header>
                    <Card.Body className="body-direita">
                        {posts.length === 0 ? (
                            <p>Carregando...</p>
                        ) : (
                            <table className="table">
                                <tbody>
                                    {posts.slice(-5).reverse().map((post) => (
                                        <tr key={post._id}>
                                            <td className="buttonAction">
                                                <button className="botao1" onClick={() => deleteFood(post._id)}>Deletar</button>
                                                <br />
                                                <button className="botao2" onClick={() => {
                                                    setOpenModal(true);
                                                    setIdTest(post._id);
                                                    setEditedBrand(post.brand);
                                                    setEditedPrice(post.price);
                                                    setEditedKg(post.kg);
                                                }}>Editar</button>
                                            </td>
                                            <td>{post.brand}</td>
                                            <td>{post.price}</td>
                                            <td>{post.kg}</td>
                                            <td>{new Date(post.date).toLocaleDateString("pt-BR")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </Card.Body>
                </Card>
            </div>
            <div className="Modal">
                {openModal && (
                    <div className="modal-form">
                        <Form className="form-modal" onSubmit={(e) => {
                            e.preventDefault();
                            editFood(idTest);
                            clear();
                        }}>
                            <h1>Edite a ração</h1>
                            <Form.Group className="setbrand" controlId="brand">
                                <Form.Label>Marca</Form.Label>
                                <Form.Control
                                    maxLength={10}
                                    placeholder="digite a marca"
                                    name="brand"
                                    value={editedBrand}
                                    required
                                    onChange={(e) => setEditedBrand(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="setprice" controlId="price">
                                <Form.Label>Preço</Form.Label>
                                <Form.Control
                                    name="price"
                                    placeholder="digite o preço"
                                    type="number"
                                    value={editedPrice}
                                    required
                                    onChange={(e) => {
                                        const price = e.target.value;
                                        if (!isNaN(price) && price >= 0) {
                                            setEditedPrice(price);
                                        }
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="setkg" controlId="kg">
                                <Form.Label>Peso</Form.Label>
                                <Form.Control
                                    name="kg"
                                    type="number"
                                    placeholder="digite o kg"
                                    value={editedKg}
                                    required
                                    onChange={(e) => {
                                        const kg = e.target.value;
                                        if (!isNaN(kg) && kg >= 0) {
                                            setEditedKg(kg);
                                        }
                                    }}
                                />
                            </Form.Group><br />
                            <div className="botoesModal">
                                <Button variant="primary" type="submit" className="botaoModalEnviar">Editar</Button>
                                <Button variant="primary" onClick={() => (setOpenModal(false), setEditedKg(''))} className="botaoModalCancelar" >Cancelar</Button>
                            </div>
                        </Form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Historic;