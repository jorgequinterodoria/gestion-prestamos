import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gestión de Préstamos</Text>
            <MaterialIcons name="account-circle" size={50} color="#4CAF50" />
            <Button title="Login" onPress={() => navigation.navigate('Login')} />
            <Button title="Registro" onPress={() => navigation.navigate('Register')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});
