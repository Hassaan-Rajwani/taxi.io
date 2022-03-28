import { StyleSheet, Text, View, Image, TextInput, Button, Alert } from 'react-native';
import arrow from '../../images/arrow.png';
import logo3 from '../../images/logo3.png';
import * as Facebook from 'expo-facebook';

export default function login() {
    async function logIn() {
        try {
            await Facebook.initializeAsync({
                appId: '537664934609917',
            });
            const { type, token, expirationDate, permissions, declinedPermissions } =
                await Facebook.logInWithReadPermissionsAsync({
                    permissions: ['public_profile'],
                });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.logoDiv}>
                <Image style={{ width: 170, height: 170 }} source={logo3} />
                <Text style={{ fontSize: 50, fontWeight: 'bold', marginTop: -30, color: '#006170' }}>TAXI.IO</Text>
            </View>

            <View style={styles.textDiv}>
                <TextInput style={styles.textInput} placeholder="Email" />
                <TextInput style={styles.textInput2} placeholder="Password" />
                <View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ fontWeight: 'bold', flex: 1, marginLeft: 10, color: '#006170' }}>Create New Account</Text>
                    <Text style={{ fontWeight: 'bold', marginRight: 10, color: '#006170' }}>Forgot Password?</Text>
                </View>
            </View>

            <View style={styles.btn}>
                <Button title="Login" color="#006170" />
                <Image source={arrow} />
            </View>

            <View style={{ marginTop: -10, width: 300 }}>
                <Button title="Login With Facebook" color="#006170" onPress={logIn} />
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
    logoDiv: {
        flex: 0.4,
    },
    textInput: {
        borderWidth: 1.5,
        borderColor: 'lightgrey',
        width: 340,
        height: 40,
        paddingLeft: 10,
        borderRadius: 5,
    },
    textInput2: {
        borderWidth: 1.5,
        borderColor: 'lightgrey',
        width: 340,
        height: 40,
        paddingLeft: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    textDiv: {
        flex: 0.3,
        width: '100%',
        alignItems: 'center',
    },
    btn: {
        flex: 0.1,
        width: 300,
    }
})