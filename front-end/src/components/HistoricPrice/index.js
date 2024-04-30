import { useState, useEffect } from "react";
import React from "react";
import api from "../../services/api.js";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './HistoricPrice.css';

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const Controle = () => {
    const [openModal, setOpenModal] = useState(false)

    const [posts, setPosts] = useState([])

    const [brand, setBrand] = useState()
    const [price, setPrice] = useState()
    const [kg, setKg] = useState()

    const [editedBrand, setEditedBrand] = useState()
    const [editedPrice, setEditedPrice] = useState()
    const [editedKg, setEditedKg] = useState()
    const [idTest, setIdTest] = useState("")

    const [selectedMonth, setSelectedMonth] = useState(null);
    const [totalGastos, setTotalGastos] = useState(0);


    const monthLabels = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const getPosts = async () => {
        await api.get("/Food").then((response) => {
            console.log("a resposta foi: ", response.data)
            setPosts(response.data)
        }).catch((erro) => {
            console.log("a resposta foi: ", erro)
            console.error("errando sempre", erro)
        });
    };

    const deleteFood = async (_id) => {
        try {
            if (!window.confirm("Você tem certeza que deseja excluir o item?")) return;
            await api.delete(`/Food/${_id}`);
            alert(" A ração deletada com sucesso!");
            getPosts()
        } catch (error) {
            alert("Ocorreu um erro ao tentar apagar a ração", error);
        }
    };


    const editFood = async (_id) => { // verificar se a funçao edit esta correta 
        try {
            await api.put(`/Food/${_id}`, {
                brand: editedBrand,
                kg: editedBrand,
                price: editedPrice,
                
            })
            alert(" A ração editada com sucesso!");
        } catch (error) {
            console.error('Erro ao atualizar ração:', error);
            alert('Um erro aconteceu ao atentar atualizar a ração');
        }
    }

    const clear = () => {
        setBrand('')
        setPrice('')
        setKg('')
    }


    const filterPostsByMonth = (month) => {
        setSelectedMonth(month);
    };


    const filterPostsBySelectedMonth = () => {
        if (selectedMonth === null) {
            return posts;
        }
        return posts.filter(post => new Date(post.date).getMonth() === selectedMonth);
    };


    const calcularTotalGastos = () => {
        let total = 0;
        if (selectedMonth === null) {
            posts.forEach(post => {
                total += post.price;
            });
        } else {
            filterPostsBySelectedMonth().forEach(post => {
                if (new Date(post.date).getMonth() === selectedMonth) {
                    total += post.price;
                }
            });
        }
        setTotalGastos(total);
    };

    const TotalGastosCard = ({ totalGastos }) => {

    };

    const graphData = () => {
        const array = []
        for (let i = 0; i < 12; i++) {
            array[i] = posts
                .filter(posts => new Date(posts.date).getMonth() === i)
                .reduce((total, posts) => total + posts.price, 0);
        }
        return array;
    }

    const data = {
        labels: monthLabels,
        datasets: [
            {
                label: "Gastos referentes a cada mês",
                data: graphData(),
                borderColor: "#ffffff",
                backgroundColor: "#db750f",

            },
        ],
    };

    useEffect(() => {
        getPosts();
    }, []);

    useEffect(() => {
        calcularTotalGastos(selectedMonth);
    }, [posts, selectedMonth]);

    return (
        <div className="home-allHistoric">
            <div className="Graph">  <Line data={data} /></div>


            <div className="card-historic-container">
                <Card className="cardMain" {...getPosts()}>
                    <Card.Header className="cardTop">Recentes</Card.Header>
                    <Card.Header>
                        <label htmlFor="monthSelect">Escolha um mês: </label>
                        <select id="monthSelect" onChange={(e) => filterPostsByMonth(parseInt(e.target.value))}>
                            <option value={null}>Todos</option>
                            {monthLabels.map((month, index) => (
                                <option key={index} value={index}>{month}</option>
                            ))}
                        </select>
                    </Card.Header>

                    <Card.Header>Total de Gastos : <h3>R$ {totalGastos}</h3></Card.Header>

                    <Card.Body className="body-direita">
                        <table className="table">
                            <tbody>
                                {filterPostsBySelectedMonth().map(post => (
                                    <Card className="CardHistorico" key={post._id}>
                                        <Card.Header className="cardHead">
                                            <td>Marca da ração: {post.brand}</td>
                                            <h7 className="card-subtitle mb-2 text-muted">{new Date(post.date).toLocaleDateString("pt-BR")}</h7>
                                        </Card.Header>
                                        <div className="CardHistoricoBody">
                                            <div>
                                                <tr>
                                                    <td> <span className="labelCard">Preço: </span>{post.price}</td>
                                                </tr>
                                                <tr>
                                                    <td><span className="labelCard">Peso:  </span>{post.kg}</td>
                                                </tr>
                                            </div>
                                            <div>
                                                <td className="buttonAction">
                                                    <button className="botao1" onClick={() => deleteFood(post._id)}>
                                                        Deletar
                                                    </button>
                                                    <br />
                                                    <button className="botao2" onClick={() => {
                                                        setOpenModal(true);
                                                        setIdTest(post._id);
                                                        setEditedBrand(post.brand);
                                                        setEditedPrice(post.price);
                                                        setEditedKg(post.kg);
                                                    }}>Editar</button>
                                                </td>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </tbody>
                        </table>
                    </Card.Body>
                </Card>
            </div>
            
            <div className="total-gastos-container">
                <TotalGastosCard totalGastos={totalGastos} />
            </div>

            <div className="Modal">
                {openModal && (
                    <div className="modal-form">
                        <Form className="form-modal" onSubmit={(e) => {
                            e.preventDefault();
                            editFood(idTest);
                            setOpenModal(false)
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
                                    maxLength={6}
                                    name="price"
                                    placeholder="digite o preço"
                                    type="number"
                                    value={editedPrice}
                                    required
                                    onChange={(e) => {
                                        let price = e.target.value;
                                        if (!isNaN(price) && price >= 0 && price <= 1000) {
                                            setEditedPrice(price);
                                        } else {
                                            alert("valor maximo de R$1000.00")
                                        }}}
                                />
                            </Form.Group>
                            <Form.Group className="setkg" controlId="kg">
                                <Form.Label>Peso</Form.Label>
                                <Form.Control
                                    maxLength={6}
                                    name="kg"
                                    type="text"
                                    placeholder="digite o kg"
                                    value={editedKg}
                                    required
                                    onChange={(e) => {
                                        let price = e.target.value;
                                        if (!isNaN(price) && price >= 0 && price <= 1000) {
                                            setEditedPrice(price);
                                        } else {
                                            alert("valor maximo de R$1000.00")
                                        }}}
                                />
                            </Form.Group><br />
                            <div className="botoesModal">
                                <Button variant="primary" type="submit" className="botaoModalEnviar">Editar</Button>
                                <Button variant="primary" onClick={() => (setOpenModal(false))} className="botaoModalCancelar" >Cancelar</Button>
                            </div>
                        </Form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Controle;