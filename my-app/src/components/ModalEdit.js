import * as React from 'react';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import { StyleSheet } from 'react-native'; // pode apagar essa parte 

export default function ModalEdit({ isOpen }) {
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };

    if (isOpen = () => setVisible(true)) {
        <PaperProvider>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
    
                    <Text>Example Modal.  Click outside this area to dismiss.</Text>
                </Modal>
            </Portal>
            <Button style={{ marginTop: 30 }} onPress={showModal}>
                Show
            </Button>
        </PaperProvider>
        console.log("esta executando o modal")
    }
    return console.log("nao deu certo")
}


const styles = StyleSheet.create({
 container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80px',
        height: '80px'
        // backgroundColor: '#1d1d2e',
        
    },
})