import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Modal
} from "react-native";
import { Avatar, Button, Card } from 'react-native-paper';
import api from "../services/Api.js"
import ModalEdit from "./ModalEdit.js";

export default function Historic() {
    const [posts, setPosts] = useState([])
    const [brand, setBrand] = useState()
    const [editedBrand, setEditedBrand] = useState()
    const [editedPrice, setEditedPrice] = useState()
    const [price, setPrice] = useState()
    const [kg, setKg] = useState()
    const [idTest, setIdTest] = useState("")
    const [openModal, setOpenModal] = useState(false)
    
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
            await api.delete(`/Food/${_id}`);
            console.log(" A ração deletada com sucesso!");
            getPosts()
        } catch (error) {
            console.log("Ocorreu um erro ao tentar apagar a ração", error);
        }
    };


    const editFood = async (_id) => { // verificar se a funçao edit esta correta 
        try {
            await api.put(`/Food/${_id}`, {
                brand: editedBrand,
                price: editedPrice,
            })
            // getPosts()
            console.log(" A ração deletada com sucesso!");
        } catch (error) {
            console.log('Erro ao atualizar ração:', error);
            console.log('Um erro aconteceu ao atentar atualizar a ração');
        }
    }
    const clear = () => {
        setBrand('')
        setPrice('')
        setKg('')
    }

    const closeModalEdit = () => {
        setOpenModal(false)
    }

    useEffect(() => {
        getPosts()
    }, []);

    return (
        <View>
            
            <ScrollView style={styles.scrollView}>
                {posts.length === 0 ? <Text>Sem gastos cadastrados</Text> : (
                    posts.map((post) => (
                        <Card style={styles.cardContainer}>
                            {/* <Card.Title title={post.brand}  variant="titleLarge"/> */}
                            <Card.Content>
                            <Text style={styles.titleCard}>{post.brand}</Text>
                                <Text variant="bodyMedium">Preço: {post.price}</Text>
                                <Text variant="bodyMedium">Peso em kg: {post.kg}</Text>
                            </Card.Content>
                            <Card.Actions>
                                <Button onPress={() => deleteFood(post._id)}>Apagar</Button>
                                <Button onPress={() => {
                                    setOpenModal(true);
                                    setIdTest(post._id);
                                }}>Editar</Button>
                            </Card.Actions>
                        </Card>
                    )))}
            </ScrollView>

            {/* o modal esta aqui */}
            <Modal transparent animationType="fade" visible={openModal} onRequestClose={closeModalEdit} >
                <View style={styles.containerModalEdit}>
                    <Text style={styles.titleModal}>
                        Editar ração
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Marca"
                        value={editedBrand}
                        onChangeText={(text) => setEditedBrand(text)}
                        placeholderTextColor={'#F0F0F0'}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="kg"
                        value={kg}
                        onChangeText={(text) => setKg(text)}
                        placeholderTextColor={'#F0F0F0'}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Preço"
                        value={editedPrice}
                        onChangeText={(text) => setEditedPrice(text)}
                        placeholderTextColor={'#F0F0F0'}
                    />
                    <View style={styles.ButtonContainer}>
                        <Button
                            style={styles.buttonModal}
                            onPress={() => (editFood(idTest) , closeModalEdit() ,  clear() )}
                            type="submit"
                            title="Submit"
                        ><Text style={styles.buttonText}>EDITAR</Text></Button>
                        <Button
                            style={styles.buttonModal}
                            onPress={() => (closeModalEdit(),  clear())}
                            title="Cancelar"
                        ><Text style={styles.buttonText}>Cancelar</Text></Button>
                    </View>
                </View>
            </Modal>
            <Button onPress={ () => getPosts()}>enviar</Button>
        </View>
    )
}
const styles = StyleSheet.create({
   
    containerModalEdit: {
        backgroundColor: 'rgba(226, 147, 72, 0.86)',
        alignItems: 'center',
        borderRadius:30,
    },
    
    inputContainer: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 34,
        paddingHorizontal: 14,
    },
    input: {
        marginStart: 10,
        width: '95%',
        height: 50,
        backgroundColor: 'rgba(145, 145, 145, 0.92)',
        marginBottom: 12,
        borderRadius: 10,
        paddingHorizontal: 8,
        marginBottom:30,
    },
    titleModal: {
        fontSize: 34,
        marginBottom: 34,
        marginTop:40,
        color: '#FFF',
        fontWeight: 'bold',
       
    }, 
    buttonModal: {
        marginBottom: 25,
        width: 100,
        height: 40,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor:"#fff",
        color: '#fff',
        marginLeft:5,
    
    },
    ButtonContainer:{
        flexDirection: 'row',
        
        
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#101026'
    },
    titleCard:{
        fontSize:18,
        fontFamily:'bold'
    },
    cardContainer:{
        marginTop:10,
    }

})