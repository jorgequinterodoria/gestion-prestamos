// ClientsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles, colors } from '../styles';

export default function ClientsScreen({ navigation }) {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const loadClients = async () => {
            const clients = JSON.parse(await AsyncStorage.getItem('clients')) || [];
            setClients(clients);
        };
        loadClients();
    }, []);

    const deleteClient = async (id) => {
        const updatedClients = clients.filter(client => client.id !== id);
        await AsyncStorage.setItem('clients', JSON.stringify(updatedClients));
        setClients(updatedClients);
    };

    const confirmDelete = (id) => {
        Alert.alert(
            'Eliminar Cliente',
            '¿Estás seguro que deseas eliminar este cliente?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', onPress: () => deleteClient(id) },
            ],
            { cancelable: false }
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate('ClientForm', { clientId: item.id })}
            >
                <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => confirmDelete(item.id)}
            >
                <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Listado de Clientes</Text>
            <FlatList
                data={clients}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        ...globalStyles.item,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 18,
        color: colors.text,
    },
    editButton: {
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: colors.background,
    },
});
