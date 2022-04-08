import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import 'react-native-gesture-handler'
import Dashbaord from '../view/Dashbaord'
import Login from '../view/Login'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

export default function MainNavigator() {
    const user = false
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Dashboard" component={Dashbaord} />
            </Stack.Navigator>
            {/* {user ? <MyDrawer /> : <AuthStack />} */}
        </NavigationContainer>
    )
}
function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    )
}
function DashboardStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={Dashbaord} />
        </Stack.Navigator>
    )
}
function MyDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Dashboard Stack" component={DashboardStack} />
        </Drawer.Navigator>
    );
}