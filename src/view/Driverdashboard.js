import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native'
import { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { useSelector } from 'react-redux'
import { getUserInfo } from '../config/firebase'
import accept from '../../images/correct.png'
import reject from '../../images/failed.png'
import { driverAccept } from '../config/firebase'
import { LogBox } from 'react-native';

export default function Driverdashboard() {
    const [request, setRequest] = useState(false)
    const [driversWill, setDriversWill] = useState('')
    const [rideData, setRideData] = useState([])
    const [location, setLocation] = useState({
        latitude: 24.9791542,
        longitude: 67.0951098,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    })

    LogBox.ignoreLogs(['Setting a timer']);
    const driver = useSelector(state => state.driverReducer.user)

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
            const userData = await getUserInfo()
            setRideData(userData)
            console.log(rideData)
            // setRequest(true)
        })();
    }, []);

    if (!rideData.length > 0) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }
    const ifAccepted = () => {
        setDriversWill(true)
        driverAccept(driver.name, driver.id, location)
    }

    const ifRejected = () => {
        setDriversWill(false)
    }

    return (
        <View style={{ width: "100%" }}>
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

            {/* { */}
            {/* request ?  */}
            <View style={{ width: '100%', height: 500, backgroundColor: 'white', position: 'absolute', bottom: 0 }}>
                <View style={{ width: '100%', alignItems: 'center', backgroundColor: '#006170', paddingBottom: 15 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', paddingHorizontal: 10, paddingTop: 10, color: 'white' }}>Rider Request</Text>
                </View>
                <ScrollView style={styles.scrollView}>
                    {rideData.map((item, index) => {
                        return (
                            <View key={index} style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', backgroundColor: 'lightgrey'}}>
                                {/* <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 20 }}>{item.name}</Text> */}
                                <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 20 }}>{item.area}</Text>
                                <TouchableOpacity onPress={ifAccepted}>
                                    <Image style={{ marginTop: 15 }} source={accept} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ifRejected}>
                                    <Image style={{ marginTop: 15, marginLeft: 10 }} source={reject} />
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            {/* : null */}
            {/* } */}
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    scrollView: {
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})