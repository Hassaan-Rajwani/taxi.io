import { StyleSheet, Text, View, Dimensions, TextInput, Alert, Modal, Pressable, ScrollView, Image } from 'react-native'
import { useState, useEffect } from 'react'
import * as React from 'react'
import * as Location from 'expo-location'
import MapView, { Marker } from 'react-native-maps'

export default function Dashbaord() {
    // const [modalVisible, setModalVisible] = useState(false)
    // const [address, setAddress] = useState('')
    const adressArray = ['Ride Ac', 'Ride', 'Ride Mini', 'Auto', 'Bike', 'Bike', 'Bike']
    const [pickUp, setPickUp] = useState('')
    const [dropOff, setDropOff] = useState('')
    const [location, setLocation] = useState({
        // 24.9325637,67.0915428 D-Phase
        latitude: 24.9791542,
        longitude: 67.0951098,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    })
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                alert('Permission to access location was denied')
                return
            }
            let currentLocation = await Location.getCurrentPositionAsync({})
            const { coords: { longitude, latitude } } = currentLocation
            setLocation({ ...location, longitude, latitude })
        })()
    }, [])
    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput} placeholder="PickUp Location" />
            <TextInput style={styles.textInput2} placeholder="DropOff Location" />
            {/* <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.')
                        setModalVisible(!modalVisible)
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput onChangeText={setAddress} value={address} style={{ borderWidth: 1.5, borderColor: 'lightgrey', height: 40, width: '100%', paddingLeft: 10, marginBottom: 10, borderRadius: 5 }} placeholder="Search" />
                            {adressArray.map((item) => {
                                return (
                                    <Pressable>
                                        <Text onPress={() => { setAddress(item) }} style={styles.modalText}>{item}</Text>
                                    </Pressable>
                                )
                            })}
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', }}>Confirm</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
                    <Text style={{ color: 'grey', fontWeight: 'bold' }}>{!address ? 'Enter Location Here !' : address}</Text>
                </Pressable>
            </View> */}
            <MapView
                region={location}
                style={styles.map}
            // mapType="satellite"
            >
                <Marker
                    draggable
                    onDragEnd={(t, map, coords) => setLocation(coords)}
                    coordinate={location}
                    position={location}
                    centerOffset={{ x: -18, y: -60 }}
                    anchor={{ x: 0.69, y: 1 }}
                    onDragStart={() => setLocation()}
                />
            </MapView>
            <View style={{ width: '100%', height: 550, backgroundColor: 'white', }}>
                <ScrollView style={styles.scrollView}>
                    {adressArray.map((item) => {
                        return (
                            <View style={{width: '100%', backgroundColor: 'white'}}>
                                <Text style={{ width: '100%', padding: 30, backgroundColor: 'white' }}>{item}</Text>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        backgroundColor: 'pink',
        width: '100%',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    textInput: {
        borderWidth: 1.5,
        width: '90%',
        position: 'absolute',
        top: 10,
        zIndex: 1,
        paddingLeft: 10,
        backgroundColor: 'white',
        borderColor: 'lightgrey',
        borderRadius: 5,
        height: 45,
    },
    textInput2: {
        borderWidth: 1.5,
        width: '90%',
        position: 'absolute',
        top: 60,
        zIndex: 1,
        paddingLeft: 10,
        backgroundColor: 'white',
        borderColor: 'lightgrey',
        borderRadius: 5,
        height: 45,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 30,
        zIndex: 1,
        width: '100%',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        width: '90%',
        alignItems: 'center',
        marginTop: -10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        padding: 10,
        elevation: 2,
        width: 200
    },
    buttonOpen: {
        borderWidth: 1.5,
        width: '90%',
        backgroundColor: 'white',
        borderColor: 'lightgrey',
        borderRadius: 5,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
        color: 'white',
        borderRadius: 20,
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
})