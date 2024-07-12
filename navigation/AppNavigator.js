// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MenuScreen from '../screens/MenuScreen';
import ClientsScreen from '../screens/ClientsScreen';
import ClientFormScreen from '../screens/ClientFormScreen';
import LoansScreen from '../screens/LoansScreen';
import LoanFormScreen from '../screens/LoanFormScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PaymentTermsScreen from '../screens/PaymentTermsScreen';
import InterestRatesScreen from '../screens/InterestRatesScreen';
import PaidLoansScreen from '../screens/PaidLoansScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Menu" component={MenuScreen} />
                <Stack.Screen name="Clients" component={ClientsScreen} />
                <Stack.Screen name="ClientForm" component={ClientFormScreen} />
                <Stack.Screen name="LoansScreen" component={LoansScreen} />
                <Stack.Screen name="LoanForm" component={LoanFormScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="InterestRates" component={InterestRatesScreen} />
                <Stack.Screen name="PaymentTerms" component={PaymentTermsScreen} />
                <Stack.Screen name="PrestamosPagados" component={PaidLoansScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
