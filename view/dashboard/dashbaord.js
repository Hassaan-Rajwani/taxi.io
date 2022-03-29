import { StyleSheet, Text, View, Dimensions, TextInput, Alert, Modal, Pressable } from 'react-native';
import { useState } from 'react';
import * as React from 'react';
import MapView from 'react-native-maps';

export default function dashbaord() {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput} placeholder="Search" />
            <MapView style={styles.map} />
        </View>
        // <View style={styles.centeredView}>
        //     <Modal
        //         animationType="slide"
        //         transparent={true}
        //         visible={modalVisible}
        //         onRequestClose={() => {
        //             Alert.alert('Modal has been closed.');
        //             setModalVisible(!modalVisible);
        //         }}>
        //         <View style={styles.centeredView}>
        //             <View style={styles.modalView}>
        //                 <Text style={styles.modalText}>Gulshan e Iqbal</Text>
        //                 <Text style={styles.modalText}>Gulshan e Iqbal</Text>
        //                 <Text style={styles.modalText}>Gulshan e Iqbal</Text>
        //                 <Text style={styles.modalText}>Gulshan e Iqbal</Text>
        //                 <Pressable
        //                     style={[styles.button, styles.buttonClose]}
        //                     onPress={() => setModalVisible(!modalVisible)}>
        //                     <Text style={styles.textStyle}>Confirm</Text>
        //                 </Pressable>
        //             </View>
        //         </View>
        //     </Modal>
        //     <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        //         <Text style={styles.textStyle}>Show Modal</Text>
        //     </Pressable>
        // </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    textInput: {
        borderWidth: 1.5,
        width: 330,
        position: 'absolute',
        top: 30,
        zIndex: 1,
        paddingLeft: 10,
        backgroundColor: 'white',
        borderColor: 'lightgrey',
        borderRadius: 5,
        height: 45,
    }
});
// const styles = StyleSheet.create({
//     centeredView: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 22,
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 35,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     button: {
//         borderRadius: 20,
//         padding: 10,
//         elevation: 2,
//     },
//     buttonOpen: {
//         backgroundColor: '#F194FF',
//     },
//     buttonClose: {
//         backgroundColor: '#2196F3',
//     },
//     textStyle: {
//         color: 'white',
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     modalText: {
//         marginBottom: 15,
//         textAlign: 'center',
//     },
// });