import React, { useEffect, useState } from "react";
import Tabela from '../../components/tabela.js'
import api from "../../services/Api.js";
import { View, Platform, StatusBar, SafeAreaView } from 'react-native';

export default function App() {
    const [posts, setPosts] = useState([]);

    return (
        <SafeAreaView style={{ flex: 1}}>
                <Tabela />
        </SafeAreaView>
    );
}