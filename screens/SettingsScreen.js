// SettingsScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles, colors } from '../styles';

export default function SettingsScreen({ navigation }) {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Configuración</Text>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('InterestRates')}
            >
                <Text style={styles.menuText}>Porcentajes de Préstamos</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('PaymentTerms')}
            >
                <Text style={styles.menuText}>Plazos de Pago</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    menuItem: {
        backgroundColor: colors.primary,
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
    },
    menuText: {
        color: colors.background,
        textAlign: 'center',
        fontSize: 18,
    },
});
