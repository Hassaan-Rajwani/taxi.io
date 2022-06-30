import { StyleSheet, Text, View, Dimensions, TextInput, Alert, Modal, Pressable, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import * as React from 'react'
import * as Location from 'expo-location'
import MapView, { Marker, Polyline } from 'react-native-maps'
import Autocomplete from 'react-native-autocomplete-input'
import { useSelector } from 'react-redux'
import { userInfo } from '../config/firebase'
import { getDriverInfo } from '../config/firebase'
import { LogBox } from 'react-native';
import { getDistance } from 'geolib';

export default function Dashbaord() {
    const [selectVehical, setSelectVehical] = useState('')
    const [query, setQuery] = useState('')
    const [query2, setQuery2] = useState('')
    const [places, setPlaces] = useState([])
    const [places2, setPlaces2] = useState([])
    const [hide, setHide] = useState(false)
    const [hide2, setHide2] = useState(false)
    const [marker, setMarker] = useState(false)
    const [opt, setOpt] = useState(false)
    const [go, setGo] = useState(false)
    const [driverData, setDriverData] = useState([])
    const [location, setLocation] = useState({
        latitude: 24.9791542,
        longitude: 67.0951098,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    })
    const [location2, setLocation2] = useState({
        latitude: 24.9791542,
        longitude: 67.0951098,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    })

    LogBox.ignoreLogs(['Setting a timer']);
    const user = useSelector(state => state.userReducer.user)

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
            // Location.watchPositionAsync({
            //     accuracy: Location.Accuracy.Highest,
            //     // timeInterval: 100,
            //     distanceInterval: 2
            // }, (currentLocation) => {
            //     const { coords: { longitude, latitude } } = currentLocation
            //     setLocation({ ...location, longitude, latitude });
            // })
            const driverInfo = await getDriverInfo()
            setDriverData(driverInfo)
            console.log(driverData)
        })();
    }, []);

    if (driverData.length < 0) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }

    const getPlaces = async (text) => {
        setQuery(text)
        const response = await fetch(`https://api.foursquare.com/v3/places/search?query=${text}&near=Karachi&limit=10`, {
            headers: {
                Accept: 'application/json',
                Authorization: 'fsq3o0p28WfXqJpd4ed/WbeDIDd19eqi8cy1Vx1Qs5cFH0c='
            }
        })
        const { results } = await response.json()
        console.log('result --->', results)
        setPlaces(results)
        setHide(false)
    }
    const getPlaces2 = async (text) => {
        setQuery2(text)
        const response = await fetch(`https://api.foursquare.com/v3/places/search?query=${text}&near=Karachi&limit=10`, {
            headers: {
                Accept: 'application/json',
                Authorization: 'fsq3o0p28WfXqJpd4ed/WbeDIDd19eqi8cy1Vx1Qs5cFH0c='
            }
        })
        const { results } = await response.json()
        console.log('result --->', results)
        setPlaces2(results)
        setHide2(false)
        setMarker(false)
    }

    const continueRide = () => {
        setGo(false)
        const km = getDistance({ latitude: location.latitude, longitude: location.longitude }, { latitude: location2.latitude, longitude: location2.longitude }) / 1000
        const price = km * 10
        userInfo(user.name, user.id, location, location2, selectVehical, 'Pending', query2, price)
    }

    return (
        <View style={{ width: "100%" }}>
            <View style={styles.autocompleteContainer}>
                <Autocomplete
                    hideResults={hide}
                    placeholder="PickUp Location"
                    style={styles.bar}
                    data={places}
                    value={query}
                    onChangeText={getPlaces}
                    flatListProps={{
                        keyExtractor: (_, idx) => idx,
                        renderItem: ({ item }) => (<View style={styles.autocompleteItem}>
                            <Text onPress={() => { setLocation({ ...location, longitude: item.geocodes.main.longitude, latitude: item.geocodes.main.latitude }), setHide(true), setQuery(item.name) }} style={styles.autocompleteText}>{item.name}, {item.location.address}</Text>
                        </View>),
                    }}
                />
            </View>

            <View style={{ flex: 1, position: 'absolute', top: 10, zIndex: 3, width: '100%', justifyContent: 'center', paddingHorizontal: 15 }}>
                <Autocomplete
                    hideResults={hide2}
                    placeholder="DropOff Location"
                    style={styles.bar2}
                    data={places2}
                    value={query2}
                    onChangeText={getPlaces2}
                    flatListProps={{
                        keyExtractor: (_, idx) => idx,
                        renderItem: ({ item }) => (<View style={styles.autocompleteItem}>
                            <Text onPress={() => { setLocation2({ ...location2, longitude: item.geocodes.main.longitude, latitude: item.geocodes.main.latitude }), setHide2(true), setQuery2(item.name), setMarker(true), setOpt(true) }} style={styles.autocompleteText}>{item.name}, {item.location.address}</Text>
                        </View>),
                    }}
                />
            </View>

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
                {
                    marker ?
                        <Marker
                            draggable
                            onDragEnd={(t, map, coords) => setLocation2(coords)}
                            coordinate={location2}
                            position={location2}
                            centerOffset={{ x: -18, y: -60 }}
                            anchor={{ x: 0.69, y: 1 }}
                            onDragStart={() => setLocation2()}
                        />
                        : null
                }

                {
                    marker ?
                        <Polyline
                            coordinates={[location, location2]}
                            strokeColor="#000"
                            fillColor="rgba(255,0,0,0.5)"
                            strokeWidth={2}
                        />
                        :
                        null
                }
            </MapView>

            {
                opt ?
                    <View style={{ width: '100%', height: 350, backgroundColor: 'white', zIndex: 9, position: 'absolute', bottom: 0 }}>
                        <View style={{ width: '100%', alignItems: 'center', backgroundColor: '#006170', paddingBottom: 15 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingHorizontal: 10, paddingTop: 10, color: 'white' }}>Select Vehical</Text>
                        </View>
                        <ScrollView style={styles.scrollView}>
                            <View style={{ width: '100%', backgroundColor: 'white' }}>
                                <Text onPress={() => { setOpt(false), setGo(true), setSelectVehical('Ac Ride') }} style={{ width: '100%', padding: 30, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>Ac Ride</Text>
                                <Text onPress={() => { setOpt(false), setGo(true), setSelectVehical('Ride') }} style={{ width: '100%', padding: 30, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>Ride</Text>
                                <Text onPress={() => { setOpt(false), setGo(true), setSelectVehical('Mini Ride') }} style={{ width: '100%', padding: 30, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>Mini Ride</Text>
                                <Text onPress={() => { setOpt(false), setGo(true), setSelectVehical('Auto Ride') }} style={{ width: '100%', padding: 30, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>Auto Ride</Text>
                                <Text onPress={() => { setOpt(false), setGo(true), setSelectVehical('Bike Ride') }} style={{ width: '100%', padding: 30, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>Bike Ride</Text>
                                <Text onPress={() => { setOpt(false), setGo(true), setSelectVehical('Bike Ride') }} style={{ width: '100%', padding: 30, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>Bike Ride</Text>
                            </View>
                        </ScrollView>
                    </View>
                    :
                    null
            }

            {
                go ?
                    <TouchableOpacity style={{ marginTop: 5, position: 'absolute', bottom: 100, zIndex: 99, width: '100%', paddingHorizontal: 40 }} onPress={continueRide}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', backgroundColor: '#006170', color: 'white', marginTop: 10, width: '100%', textAlign: 'center', padding: 10, borderRadius: 5 }}>Let's Go</Text>
                    </TouchableOpacity>
                    :
                    null
            }

            <View>
                <Text>{driverData.name}</Text>
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
    bar: {
        paddingLeft: 10,
        borderWidth: 1.5,
        height: 45,
        borderColor: 'lightgrey',
        borderRadius: 5,
        backgroundColor: 'white',
    },
    bar2: {
        paddingLeft: 10,
        borderWidth: 1.5,
        height: 45,
        borderColor: 'lightgrey',
        borderRadius: 5,
        backgroundColor: 'white',
        marginTop: 50,
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
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 10,
        zIndex: 5,
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 15,
    },
    autocompleteItem: {
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    autocompleteText: {
        fontSize: 18
    }
})