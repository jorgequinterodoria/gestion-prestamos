import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles, colors } from '../styles';

export default function PaidLoansScreen() {
    const [paidLoans, setPaidLoans] = useState([]);

    useEffect(() => {
        const loadPaidLoans = async () => {
            const loansData = JSON.parse(await AsyncStorage.getItem('loans')) || [];
            const filteredLoans = loansData.filter(loan => !loan.isActive);
            setPaidLoans(filteredLoans);
        };

        loadPaidLoans();
    }, []);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.loanItem}>
                <Text style={styles.loanText}>Cliente: {item.clientId}</Text>
                <Text style={styles.loanText}>Valor del Préstamo: ${item.loanValue.toFixed(2)}</Text>
                <Text style={styles.loanText}>Valor de la Cuota: ${item.installmentValue.toFixed(2)}</Text>
                <Text style={styles.loanText}>Fecha del Préstamo: {item.loanDate}</Text>
            </View>
        );
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Préstamos Pagados</Text>
            {paidLoans.length > 0 ? (
                <FlatList
                    data={paidLoans}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <Text>No hay préstamos pagados para mostrar.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    loanItem: {
        backgroundColor: colors.light,
        padding: 20,
        borderRadius: 5,
        marginBottom: 15,
    },
    loanText: {
        fontSize: 16,
        marginBottom: 5,
    },
    listContainer: {
        paddingBottom: 20,
    },
});
