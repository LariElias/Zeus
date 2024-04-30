import React from "react";
import Formulario from '../../components/Formulario.js'
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View, Platform } from "react-native";

export default function App() {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <Formulario />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

