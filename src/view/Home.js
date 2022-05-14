import { StyleSheet, Text, View, Image, TextInput, Alert, TouchableOpacity } from 'react-native';
import logo3 from '../../images/logo3.png';

export default function Home({navigation}) {
    const rider = () => {
        navigation.navigate('Rider Login')
    }
    const driver = () => {
        navigation.navigate('Driver Login')
    }
    return (
        <View style={styles.container}>
            <View style={styles.logoDiv}>
                <Image style={{ width: 170, height: 170 }} source={logo3} />
                <Text style={{ fontSize: 50, fontWeight: 'bold', marginTop: -30, color: '#006170' }}>TAXI.IO</Text>
            </View>

            <View style={styles.textDiv}>
                <TouchableOpacity onPress={driver}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', backgroundColor: '#006170', color: 'white', marginTop: 15, width: 300, textAlign: 'center', padding: 5, borderRadius: 5 }}>Continue As Driver</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={rider}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', backgroundColor: '#006170', color: 'white', marginTop: 15, width: 300, textAlign: 'center', padding: 5, borderRadius: 5 }}>Continue As User</Text>
                </TouchableOpacity>
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
        width: '100%',
    },
    logoDiv: {
        flex: 0.4,
    },
    textDiv: {
        flex: 0.3,
        width: '100%',
        alignItems: 'center',
    },
});