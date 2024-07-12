// InterestRatesScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles, colors } from '../styles';

export default function InterestRatesScreen() {
    const [interestRates, setInterestRates] = useState([]);
    const [newRate, setNewRate] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const loadInterestRates = async () => {
            const rates = JSON.parse(await AsyncStorage.getItem('interestRates')) || [];
            setInterestRates(rates);
        };
        loadInterestRates();
    }, []);

    const addRate = async () => {
        if (!newRate) {
            Alert.alert('Error', 'Por favor ingresa un porcentaje válido.');
            return;
        }

        const rate = { id: Date.now().toString(), value: parseFloat(newRate) };
        const updatedRates = [...interestRates, rate];
        setInterestRates(updatedRates);
        await AsyncStorage.setItem('interestRates', JSON.stringify(updatedRates));
        setNewRate('');
    };

    const editRate = async () => {
        if (!newRate) {
            Alert.alert('Error', 'Por favor ingresa un porcentaje válido.');
            return;
        }

        const updatedRates = interestRates.map(rate =>
            rate.id === editId ? { ...rate, value: parseFloat(newRate) } : rate
        );

        setInterestRates(updatedRates);
        await AsyncStorage.setItem('interestRates', JSON.stringify(updatedRates));
        setEditMode(false);
        setEditId(null);
        setNewRate('');
    };

    const deleteRate = async (id) => {
        const updatedRates = interestRates.filter(rate => rate.id !== id);
        await AsyncStorage.setItem('interestRates', JSON.stringify(updatedRates));
        setInterestRates(updatedRates);
    };

    const startEdit = (id, value) => {
        setEditMode(true);
        setEditId(id);
        setNewRate(value.toString());
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.value}%</Text>
            <TouchableOpacity
                style={styles.editButton}
                onPress={() => startEdit(item.id, item.value)}
            >
                <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteRate(item.id)}
            >
                <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Porcentajes de Préstamos</Text>
            <FlatList
                data={interestRates}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
            {editMode ? (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nuevo Porcentaje (%)"
                        keyboardType="numeric"
                        value={newRate}
                        onChangeText={setNewRate}
                    />
                    <Button title="Guardar" onPress={editRate} />
                </View>
            ) : (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nuevo Porcentaje (%)"
                        keyboardType="numeric"
                        value={newRate}
                        onChangeText={setNewRate}
                    />
                    <Button title="Agregar" onPress={addRate} />
                </View>
            )}
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    input: {
        ...globalStyles.input,
        flex: 1,
        marginRight: 10,
    },
});
