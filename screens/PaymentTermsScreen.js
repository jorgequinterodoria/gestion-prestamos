// PaymentTermsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles, colors } from '../styles';

export default function PaymentTermsScreen() {
    const [paymentTerms, setPaymentTerms] = useState([]);
    const [newTerm, setNewTerm] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const loadPaymentTerms = async () => {
            const terms = JSON.parse(await AsyncStorage.getItem('paymentTerms')) || [];
            setPaymentTerms(terms);
        };
        loadPaymentTerms();
    }, []);

    const addTerm = async () => {
        if (!newTerm) {
            Alert.alert('Error', 'Por favor ingresa un plazo válido.');
            return;
        }

        const term = { id: Date.now().toString(), value: newTerm };
        const updatedTerms = [...paymentTerms, term];
        setPaymentTerms(updatedTerms);
        await AsyncStorage.setItem('paymentTerms', JSON.stringify(updatedTerms));
        setNewTerm('');
    };

    const editTerm = async () => {
        if (!newTerm) {
            Alert.alert('Error', 'Por favor ingresa un plazo válido.');
            return;
        }

        const updatedTerms = paymentTerms.map(term =>
            term.id === editId ? { ...term, value: newTerm } : term
        );

        setPaymentTerms(updatedTerms);
        await AsyncStorage.setItem('paymentTerms', JSON.stringify(updatedTerms));
        setEditMode(false);
        setEditId(null);
        setNewTerm('');
    };

    const deleteTerm = async (id) => {
        const updatedTerms = paymentTerms.filter(term => term.id !== id);
        await AsyncStorage.setItem('paymentTerms', JSON.stringify(updatedTerms));
        setPaymentTerms(updatedTerms);
    };

    const startEdit = (id, value) => {
        setEditMode(true);
        setEditId(id);
        setNewTerm(value);
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.value}</Text>
            <TouchableOpacity
                style={styles.editButton}
                onPress={() => startEdit(item.id, item.value)}
            >
                <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTerm(item.id)}
            >
                <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Plazos de Pago</Text>
            <FlatList
                data={paymentTerms}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
            {editMode ? (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nuevo Plazo"
                        value={newTerm}
                        onChangeText={setNewTerm}
                    />
                    <Button title="Guardar" onPress={editTerm} />
                </View>
            ) : (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nuevo Plazo"
                        value={newTerm}
                        onChangeText={setNewTerm}
                    />
                    <Button title="Agregar" onPress={addTerm} />
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
