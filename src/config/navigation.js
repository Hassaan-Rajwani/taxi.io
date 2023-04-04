import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import 'react-native-gesture-handler'
import Dashbaord from '../view/Dashbaord'
import Driverdashboard from '../view/Driverdashboard'
import Login from '../view/Login'
import Trips from '../view/Trips'
import Logout from '../view/Logout'
import Home from '../view/Home'
import Driver from '../view/Driver'
import { useSelector } from 'react-redux'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

export default function MainNavigator() {
    const user = useSelector(state => state.userReducer.user)
    const driver = useSelector(state => state.driverReducer.user)
    return (
        <NavigationContainer>
            {user ? <MyDrawer /> : <AuthStack />}
        </NavigationContainer>
    )
}
function AuthStack() {
    return (
            <Stack.Navigator>
                <Stack.Screen name="Main Page" component={Home} />
                <Stack.Screen name="Rider Login" component={Login} />
                <Stack.Screen name="Driver Login" component={Driver} />
            </Stack.Navigator>
    )
}
function DashboardStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Dashboard" component={Dashbaord} />
            <Stack.Screen name="Driver Dashboard" component={Driverdashboard} />
        </Stack.Navigator>
    )
}
function DriverDashboardStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Driver Dashboard" component={Driverdashboard} />
        </Stack.Navigator>
    )
}
function MyDrawer() {
    return (
        <Drawer.Navigator useLegacyImplementation={true}>
            <Drawer.Screen name="Dashboard Stack" component={DashboardStack} />
            <Drawer.Screen name="Your Trips" component={Trips} />
            <Drawer.Screen name="LogOut" component={Logout} />
        </Drawer.Navigator>
    );
}   
function DriverDrawer() {
    return (
        <Drawer.Navigator useLegacyImplementation={true}>
            <Drawer.Screen name="Driver Dashboard Stack" component={DriverDashboardStack} />
            <Drawer.Screen name="LogOut" component={Logout} />
        </Drawer.Navigator>
    );
}   
