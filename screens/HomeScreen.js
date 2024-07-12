import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles, colors } from '../styles'; 
export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gestión de Préstamos</Text>
            <MaterialIcons name="account-circle" size={50} color={colors.primary} />
            <Button title="Login" onPress={() => navigation.navigate('Login')} />
            <Button title="Registro" onPress={() => navigation.navigate('Register')} />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    container: {
        flex: 1,
        backgroundColor: colors.primary, 
        justifyContent: 'center',
        alignItems: 'center',
    },
});
