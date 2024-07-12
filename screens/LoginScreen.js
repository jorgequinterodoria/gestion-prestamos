// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { globalStyles } from '../styles';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Aquí puedes agregar la lógica de autenticación
        navigation.navigate('Menu');
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Login</Text>
            <TextInput
                placeholder="Nombre de usuario"
                style={globalStyles.input}
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Contraseña"
                style={globalStyles.input}
                value={password}
                secureTextEntry
                onChangeText={setPassword}
            />
            <Button title="Iniciar Sesión" onPress={handleLogin} />
            <Button title="Registrarse" onPress={() => navigation.navigate('Register')} />
        </View>
    );
}
