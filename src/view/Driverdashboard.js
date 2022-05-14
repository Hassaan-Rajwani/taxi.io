import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
// import { useSelector } from 'react-redux'
import { getUserInfo } from '../config/firebase'

export default function Driverdashboard() {
    const [rideData, setRideData] = useState([])
    const [location, setLocation] = useState({
        latitude: 24.9791542,
        longitude: 67.0951098,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    })

    // const driver = useSelector(state => state.driverReducer.user)

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
        })();
    }, []);

    if (!rideData.length > 0) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
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
            <View>
                <Text style={{position: 'absolute', bottom: 100}}>{rideData[0].name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})