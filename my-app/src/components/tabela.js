import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal,
    Alert

} from "react-native";
import { Button, Card } from 'react-native-paper';
import api from "../services/Api.js"
import RNPickerSelect from 'react-native-picker-select';
import { useFocusEffect } from "@react-navigation/native";


export default function Historic() {
    const [posts, setPosts] = useState([])

    const [brand, setBrand] = useState()
    const [price, setPrice] = useState()
    const [kg, setKg] = useState()

    const [editedBrand, setEditedBrand] = useState()
    const [editedPrice, setEditedPrice] = useState()
    const [editedKg, setEditedKg] = useState()


    const [idTest, setIdTest] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [idToDelete, setIdToDelete] = useState('');

    const [selectedMonth, setSelectedMonth] = useState(null);
    const [totalGastos, setTotalGastos] = useState(0);

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
            Alert.alert(" A ração deletada com sucesso!");
            getPosts()
        } catch (error) {
            Alert.alert("Ocorreu um erro ao tentar apagar a ração", error);
        }
    };


    const editFood = async (_id) => { // verificar se a funçao edit esta correta 
        try {
            await api.put(`/Food/${_id}`, {
                brand: editedBrand,
                price: editedPrice,
            })
            Alert.alert(" A ração editada com sucesso!");
        } catch (error) {
            console.log('Erro ao atualizar ração:', error);
            Alert.alert('Um erro aconteceu ao atentar atualizar a ração');
        }
        getPosts()
        clear()
    }

    const monthLabels = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

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

    const clear = () => {
        setBrand('')
        setPrice('')
        setKg('')
    }

    const closeModalEdit = () => {
        setOpenModal(false)
    }
    const closeModalDelete = () => {
        setOpenModalDelete(false);
        setIdToDelete('');
    };
    useEffect(() => {
        getPosts()
    }, []);

    useFocusEffect(
        React.useCallback(() => {
          return () => getPosts();
        }, [])
      );

    return (
        <View>

            <ScrollView style={styles.scrollView}>
                {posts.length === 0 ? <Text>Sem gastos cadastrados</Text> : (
                    posts.map((post, index) => (
                        <Card style={styles.cardContainer} key={index}>
                            <Card.Content>
                                <Text style={styles.titleCard}>{post.brand}</Text>
                                <Text variant="bodyMedium">Preço: {post.price}</Text>
                                <Text variant="bodyMedium">Peso em kg: {post.kg}</Text>
                            </Card.Content>

                            <Card.Actions>
                                <Button
                                    onPress={() => { }}
                                    title="Apagar"
                                    color="transparent" 
                                    accessibilityLabel="Apagar" 
                                    style={{ borderWidth: 0, borderColor: 'transparent' }} 
                                />

                                <Button onPress={() => {
                                    deleteFood(post._id)
                                }}
                                    style={styles.buttonDeleteTab}>
                                    Apagar
                                    </Button>

                                <Button onPress={() => {
                                    setOpenModal(true);
                                    setIdTest(post._id);
                                    
       
                                }}
                                    style={styles.buttonDeleteTab}
                                >Editar</Button>
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
                        maxLength={15}
                        style={styles.input}
                        placeholder="Marca"
                        value={editedBrand}
                        onChangeText={(text) => setEditedBrand(text)}
                        placeholderTextColor={'#F0F0F0'}
                    />
                    <TextInput
                        maxLength={5}
                        style={styles.input}
                        placeholder="Preço"
                        value={editedPrice}
                        onChangeText={(text) => setEditedPrice(text.replace(/[^0-9.]/g, ''))}
                        keyboardType="numeric"
                        placeholderTextColor={'#F0F0F0'}
                    />
                    <TextInput
                        maxLength={5}
                        style={styles.input}
                        placeholder="kg"
                        value={editedKg}
                        onChangeText={(text) => setEditedKg(text.replace(/[^0-9.]/g, ''))}
                        keyboardType="numeric"
                        placeholderTextColor={'#F0F0F0'}
                    />

                    <View style={styles.ButtonContainer}>
                        <Button
                            style={styles.buttonModal}
                            onPress={() => { editFood(idTest); closeModalEdit(); }}
                            title="Submit"
                        >
                            <Text style={styles.buttonText}>EDITAR</Text>
                        </Button>
                        <Button
                            style={styles.buttonModal}
                            onPress={() => { closeModalEdit(); clear(); }}
                            title="Cancelar"
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </Button>
                    </View>
                </View>
            </Modal>


            {/* o modal delete esta aqui */}
            <Modal transparent animationType="fade" visible={openModalDelete} onRequestClose={closeModalDelete}>
                <View style={styles.containerModalEdit}>
                    <Text style={styles.titleModal}>
                        Tem certeza que deseja apagar a ração?
                    </Text>
                    <View style={styles.ButtonContainer}>
                        <Button
                            style={styles.buttonModal}
                            onPress={() => {
                                deleteFood(idToDelete);
                                closeModalDelete();
                            }}
                            type="submit"
                            title="Submit"
                        >
                            <Text style={styles.buttonText}>Apagar</Text>
                        </Button>
                        <Button
                            style={styles.buttonModal}
                            onPress={() => closeModalDelete()}
                            title="Cancelar"
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({

    containerModalEdit: {
        backgroundColor: 'rgb(184, 184, 184)',
        alignItems: 'center',
        borderRadius: 30,
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
        marginBottom: 30,
    },
    titleModal: {
        fontSize: 34,
        marginBottom: 34,
        marginTop: 40,
        color: '#FFF',
        fontWeight: 'bold',

    },
    buttonModal: {
        marginBottom: 25,
        width: 100,
        height: 40,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: "#fff",
        color: '#fff',
        marginLeft: 5,

    },
    ButtonContainer: {
        flexDirection: 'row',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#101026'
    },
    titleCard: {
        fontSize: 18,
        fontWeight: '700'
    },
    cardContainer: {
        marginTop: 5,
        marginBottom: 5,
    },
    buttonDeleteTab: {
        backgroundColor: '#B5CBB7',
        Textcolor: '#818479!important',
        border: 'none!important',
    },
    buttonTab: {
        borderColor: '#B5CBB7',
        Textcolor: '#818479!important',
    }

})