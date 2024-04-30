import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert
} from "react-native";
import api from '../services/Api.js'
import { ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
    const [posts, setPosts] = useState([])

    const [brand, setBrand] = useState('')
    const [price, setPrice] = useState('')
    const [kg, setKg] = useState('')

    const createFood = async () => {
        try {
            if (!/^[a-zA-Z0-9 ]*$/.test(brand)) {
                Alert.alert('Por favor, insira uma marca válida.');
                return;
            }

            const parsedPrice = parseFloat(price);
            if (isNaN(parsedPrice) || parsedPrice < 0) {
                Alert.alert('Por favor, insira um preço válido.');
                return;
            }

            const parsedKg = parseFloat(kg);
            if (isNaN(parsedKg) || parsedKg < 0) {
                Alert.alert('Por favor, insira um peso válido.');
                return;
            }

            await api.post('/Food', {
                brand: brand,
                kg: parsedKg,
                price: parsedPrice
            });

            Alert.alert("Ração cadastrada com sucesso!!");
            getPosts();
            clear();
        } catch (error) {
            console.error('Erro ao tentar adicionar ração:', error);
            Alert.alert('Um erro ocorreu ao adicionar a ração.');
        }
    }

    const getPosts = async () => {
        try {
            const response = await api.get("/Food");
            setPosts(response.data);
        } catch (error) {
            console.error("Erro ao obter as rações:", error);
            Alert.alert("Um erro ocorreu ao obter as rações.");
        }
    };

    const clear = () => {
        setBrand('')
        setPrice('')
        setKg('')
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <LinearGradient
            colors={['#B5CBB7', '#E4E9B2']}>
            <View style={styles.container}>
                <Image
                    style={styles.logoDOG}
                    source={require('../assets/logoDOG.png')}
                />
                <Text style={styles.titleSub}>Seja bem-vindo ao</Text>
                <Text style={styles.title}>PetFeed Manager </Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.textLabel}>Digite a marca:</Text>
                    <TextInput
                        maxLength={10}
                        placeholder="marca do produto"
                        style={[styles.input]}
                        placeholderTextColor={'#727372'}
                        value={brand}
                        onChangeText={(text) => setBrand(text)}
                        required
                    />
                    <Text style={styles.textLabel}>Digite o preço:</Text>
                    <TextInput
                        maxLength={7} // Aumentei o máximo para permitir preços maiores
                        placeholder="preço do produto"
                        style={styles.input}
                        placeholderTextColor={'#727372'}
                        keyboardType="numeric"
                        value={price}
                        onChangeText={(text) => setPrice(text.replace(/[^0-9.]/g, ''))}
                        required
                    />
                    <Text style={styles.textLabel}>Digite o peso em kg:</Text>
                    <TextInput
                        maxLength={5}
                        placeholder="peso/kg do produto"
                        style={styles.input}
                        placeholderTextColor={'#727372'}
                        keyboardType="numeric"
                        value={kg}
                        onChangeText={(text) => setKg(text.replace(/[^0-9.]/g, ''))}
                        required
                    />
                    <TouchableOpacity style={styles.buttonSub} onPress={createFood}>
                        <Text style={styles.buttonText}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    )
    }

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',

    },
    background: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // para que a imagem cubra todo o espaço
    },
    logoDOG: {
        width: 200,
        height: 150,
        marginBottom: 0,
        alignItems: 'center',
    },
    inputContainer: {
        width: '95%',
        // alignItems: 'center',
        justifyContent: 'center',
        marginStart: 20,
        paddingVertical: 34,
        paddingHorizontal: 14,
        color: '#727372'
    },
    input: {
        width: '95%',
        height: 40,
        backgroundColor: '#bfbfbf',
        // borderColor:'#ffff',
        marginBottom: 12,
        borderRadius: 10,
        paddingHorizontal: 8,

    },
    title: {
        fontSize: 34,
        marginBottom: 34,
        color: '#818479',
        fontWeight: 'bold'
    },

    buttonSub: {
        width: '95%',
        height: 40,
        marginTop: 20,
        backgroundColor: '#B5CBB7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#101026'
    },
    titleSub: {
        color: '#818479',
        fontSize: 20,
    },
    textLabel: {
        textAlign: 'left',
        marginBottom: 8,
        fontSize: 17,
        fontWeight: 'bold',
    },
    inputContainerPressed: {
        width: '95%',
        height: 40,
        backgroundColor: '#fff',
        // borderColor:'#ffff',
        borderWidth: 10,
        marginBottom: 12,
        borderRadius: 10,
        paddingHorizontal: 8,
    },
    inputFocused: {
        backgroundColor: '#fff'
        // Mudança da cor da borda quando o input é focado
    },


})