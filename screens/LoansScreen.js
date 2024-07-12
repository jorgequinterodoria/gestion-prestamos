import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles, colors } from '../styles';

export default function LoansScreen({ navigation }) {
    const [loans, setLoans] = useState([]);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const loadLoansAndClients = async () => {
            const loansData = JSON.parse(await AsyncStorage.getItem('loans')) || [];
            const clientsData = JSON.parse(await AsyncStorage.getItem('clients')) || [];
            setLoans(loansData);
            setClients(clientsData);
        };

        const focusListener = navigation.addListener('focus', loadLoansAndClients);

        // Verificar si focusListener tiene remove, de lo contrario usar removeListener
        return () => {
            if (focusListener && focusListener.remove) {
                focusListener.remove();
            } else {
                navigation.removeListener('focus', loadLoansAndClients);
            }
        };
    }, [navigation]);

    const deleteLoan = async (id) => {
        const updatedLoans = loans.filter((loan) => loan.id !== id);
        await AsyncStorage.setItem('loans', JSON.stringify(updatedLoans));
        setLoans(updatedLoans);
    };

    const confirmDeleteLoan = (id) => {
        Alert.alert(
            'Confirmar Eliminación',
            '¿Estás seguro de que deseas eliminar este préstamo?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', onPress: () => deleteLoan(id) },
            ],
            { cancelable: false }
        );
    };

    const renderItem = ({ item }) => {
        const client = clients.find((client) => client.id === item.clientId);
        const clientName = client ? client.name : 'Cliente no encontrado';

        return (
            <View style={styles.loanItem}>
                <View style={styles.loanDetails}>
                    <Text style={styles.loanText}>Cliente: {clientName} (ID: {item.clientId})</Text>
                    <Text style={styles.loanText}>Valor del Préstamo: ${item.loanValue.toFixed(2)}</Text>
                    <Text style={styles.loanText}>Valor de la Cuota: ${item.installmentValue.toFixed(2)}</Text>
                    <Text style={styles.loanText}>Fecha del Préstamo: {item.loanDate}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => navigation.navigate('LoanFormScreen', { loanId: item.id })}
                    >
                        <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => confirmDeleteLoan(item.id)}
                    >
                        <Text style={styles.buttonText}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Listado de Préstamos</Text>
            <FlatList
                data={loans}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    loanItem: {
        backgroundColor: colors.light,
        padding: 20,
        borderRadius: 5,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    loanDetails: {
        flex: 1,
    },
    loanText: {
        fontSize: 16,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    editButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: colors.danger,
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
    },
    listContainer: {
        paddingBottom: 20,
    },
});
