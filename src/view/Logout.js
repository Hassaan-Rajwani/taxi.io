import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { addUser } from '../store/user/userAction'
import { addDriver } from '../store/driver/driverAction'
import { useDispatch } from 'react-redux'

export default function Logout() {
    const dispatch = useDispatch()
    const out = () => {
        dispatch(addUser(null))
        dispatch(addDriver(null))
    }
    return (
        <View>
            <TouchableOpacity style={{ marginTop: 20, zIndex: 99, width: '100%', paddingHorizontal: 40 }} onPress={out}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', backgroundColor: '#006170', color: 'white', marginTop: 10, width: '100%', textAlign: 'center', padding: 10, borderRadius: 5 }}>LogOut</Text>
            </TouchableOpacity>
        </View>
    )
}