import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, Platform, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { globalStyles, colors } from '../styles';

export default function LoanFormScreen({ navigation }) {
    const [clients, setClients] = useState([]);
    const [interestRates, setInterestRates] = useState([]);
    const [paymentTerms, setPaymentTerms] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const [selectedRate, setSelectedRate] = useState('');
    const [selectedTerm, setSelectedTerm] = useState('');
    const [loanValue, setLoanValue] = useState('');
    const [installmentValue, setInstallmentValue] = useState('');
    const [loanDate, setLoanDate] = useState(new Date());
    const [isActive, setIsActive] = useState(true); // Nuevo estado para indicar si el préstamo está activo
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        const loadClients = async () => {
            const clientsData = JSON.parse(await AsyncStorage.getItem('clients')) || [];
            setClients(clientsData);
        };

        const loadInterestRates = async () => {
            const rates = JSON.parse(await AsyncStorage.getItem('interestRates')) || [];
            setInterestRates(rates);
        };

        const loadPaymentTerms = async () => {
            const terms = JSON.parse(await AsyncStorage.getItem('paymentTerms')) || [];
            setPaymentTerms(terms);
        };

        loadClients();
        loadInterestRates();
        loadPaymentTerms();
    }, []);

    const calculateInstallment = () => {
        if (!selectedRate || !loanValue) {
            Alert.alert('Error', 'Por favor selecciona un porcentaje y un valor de préstamo válidos.');
            return;
        }

        const rate = interestRates.find(rate => rate.id === selectedRate);
        const monthlyInterest = rate.value / 100;
        const installment = parseFloat(loanValue) * monthlyInterest;
        setInstallmentValue(installment.toFixed(2));
    };

    const saveLoan = async () => {
        if (!selectedClient || !selectedRate || !selectedTerm || !loanValue || !installmentValue || !loanDate) {
            Alert.alert('Error', 'Por favor completa todos los campos.');
            return;
        }

        const loan = {
            id: Date.now().toString(),
            clientId: selectedClient,
            rateId: selectedRate,
            termId: selectedTerm,
            loanValue: parseFloat(loanValue),
            installmentValue: parseFloat(installmentValue),
            loanDate: loanDate.toISOString().split('T')[0],
            isActive: isActive, // Guardar el estado de activo/desactivo
        };

        // Guardar préstamo en local storage
        const loans = JSON.parse(await AsyncStorage.getItem('loans')) || [];
        loans.push(loan);
        await AsyncStorage.setItem('loans', JSON.stringify(loans));

        // Limpiar campos después de guardar
        setSelectedClient('');
        setSelectedRate('');
        setSelectedTerm('');
        setLoanValue('');
        setInstallmentValue('');
        setLoanDate(new Date());
        setIsActive(true); // Restablecer el estado a activo

        // Mostrar mensaje de éxito
        Alert.alert('Éxito', 'Préstamo guardado exitosamente.');

        // Navegar de regreso a la lista de préstamos
        navigation.goBack();
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || loanDate;
        setShowDatePicker(Platform.OS === 'ios');
        setLoanDate(currentDate);
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Crear Préstamo</Text>

            {/* Selector de cliente */}
            <RNPickerSelect
                placeholder={{ label: 'Selecciona un cliente...', value: '' }}
                items={clients.map(client => ({ label: client.name, value: client.id }))}
                onValueChange={(value) => setSelectedClient(value)}
                style={pickerSelectStyles}
                value={selectedClient}
            />

            {/* Selector de porcentaje */}
            <RNPickerSelect
                placeholder={{ label: 'Selecciona un porcentaje...', value: '' }}
                items={interestRates.map(rate => ({ label: `${rate.value}%`, value: rate.id }))}
                onValueChange={(value) => setSelectedRate(value)}
                style={pickerSelectStyles}
                value={selectedRate}
            />

            {/* Selector de plazo de pago */}
            <RNPickerSelect
                placeholder={{ label: 'Selecciona un plazo de pago...', value: '' }}
                items={paymentTerms.map(term => ({ label: term.value, value: term.id }))}
                onValueChange={(value) => setSelectedTerm(value)}
                style={pickerSelectStyles}
                value={selectedTerm}
            />

            {/* Campo de valor del préstamo */}
            <TextInput
                style={styles.input}
                placeholder="Valor del Préstamo"
                keyboardType="numeric"
                value={loanValue}
                onChangeText={setLoanValue}
            />

            {/* Campo de valor de la cuota */}
            <TextInput
                style={styles.input}
                placeholder="Valor de la Cuota"
                keyboardType="numeric"
                value={installmentValue}
                onChangeText={setInstallmentValue}
                editable={false} // El valor de la cuota se calcula automáticamente
            />

            {/* Selector de fecha del préstamo */}
            <View>
                <Button onPress={() => setShowDatePicker(true)} title="Selecciona la fecha del préstamo" />
                {showDatePicker && (
                    <DateTimePicker
                        value={loanDate}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
            </View>

            {/* Switch para activar/desactivar préstamo */}
            <View style={styles.switchContainer}>
                <Text style={styles.switchText}>Prestamo Activo</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isActive ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setIsActive(previousState => !previousState)}
                    value={isActive}
                />
            </View>

            {/* Botón para calcular valor de la cuota */}
            <Button title="Calcular Cuota" onPress={calculateInstallment} />

            {/* Botón para guardar el préstamo */}
            <Button title="Guardar Préstamo" onPress={saveLoan} />
        </View>
    );
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 50,
        backgroundColor: colors.light,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: colors.text,
    },
    inputAndroid: {
        height: 50,
        backgroundColor: colors.light,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: colors.text,
    },
});

const styles = StyleSheet.create({
    input: {
        height: 50,
        backgroundColor: colors.light,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    datePicker: {
        height: 50,
        backgroundColor: colors.light,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        justifyContent: 'center',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    switchText: {
        fontSize: 18,
    },
});
