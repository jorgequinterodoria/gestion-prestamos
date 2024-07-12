// MenuScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles, colors } from '../styles';

export default function MenuScreen({ navigation }) {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Menú Principal</Text>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('Clients')}
            >
                <Text style={styles.menuText}>Listado de Clientes</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('LoansScreen')}
            >
                <Text style={styles.menuText}>Listado de Préstamos</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('ClientForm')}
            >
                <Text style={styles.menuText}>Crear Cliente</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('LoanForm')}
            >
                <Text style={styles.menuText}>Crear Préstamo</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('Settings')}
            >
                <Text style={styles.menuText}>Configuración</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('PrestamosPagados')}
            >
                <Text style={styles.menuText}>Préstamos Pagados</Text>
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
