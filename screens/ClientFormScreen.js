import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../styles';

export default function ClientFormScreen({ navigation, route }) {
    const { clientId } = route.params || {};
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (clientId) {
            const loadClient = async () => {
                const clients = JSON.parse(await AsyncStorage.getItem('clients')) || [];
                const client = clients.find(c => c.id === clientId);
                if (client) {
                    setName(client.name);
                    setPhone(client.phone);
                    setAddress(client.address);
                }
            };
            loadClient();
        }
    }, [clientId]);

    const saveClient = async () => {
        if (phone.length !== 10 || isNaN(phone)) {
            Alert.alert('Error', 'El teléfono debe tener 10 dígitos numéricos');
            return;
        }

        const clients = JSON.parse(await AsyncStorage.getItem('clients')) || [];
        if (clientId) {
            const index = clients.findIndex(c => c.id === clientId);
            if (index > -1) {
                clients[index] = { id: clientId, name, phone, address };
            }
        } else {
            const newClient = { id: Date.now().toString(), name, phone, address };
            clients.push(newClient);
        }
        await AsyncStorage.setItem('clients', JSON.stringify(clients));
        navigation.navigate('Clients');
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>{clientId ? 'Editar Cliente' : 'Nuevo Cliente'}</Text>
            <TextInput
                placeholder="Nombre"
                style={globalStyles.input}
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="Teléfono"
                style={globalStyles.input}
                value={phone}
                keyboardType="numeric"
                maxLength={10}
                onChangeText={setPhone}
            />
            <TextInput
                placeholder="Dirección"
                style={globalStyles.input}
                value={address}
                onChangeText={setAddress}
            />
            <Button title="Guardar" onPress={saveClient} />
        </View>
    );
}
