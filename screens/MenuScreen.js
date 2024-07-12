import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importa el ícono que desees utilizar desde @expo/vector-icons
import { globalStyles, colors } from '../styles';

export default function MenuScreen({ navigation }) {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Menú Principal</Text>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('Clients')}
            >
                <Ionicons name="people-outline" size={24} color={colors.background} style={styles.icon} />
                <Text style={styles.menuText}>Listado de Clientes</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('LoansScreen')}
            >
                <Ionicons name="cash-outline" size={24} color={colors.background} style={styles.icon} />
                <Text style={styles.menuText}>Listado de Préstamos</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('ClientForm')}
            >
                <Ionicons name="person-add-outline" size={24} color={colors.background} style={styles.icon} />
                <Text style={styles.menuText}>Crear Cliente</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('LoanForm')}
            >
                <Ionicons name="cash-outline" size={24} color={colors.background} style={styles.icon} />
                <Text style={styles.menuText}>Crear Préstamo</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('Settings')}
            >
                <Ionicons name="settings-outline" size={24} color={colors.background} style={styles.icon} />
                <Text style={styles.menuText}>Configuración</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('PrestamosPagados')}
            >
                <Ionicons name="checkmark-circle-outline" size={24} color={colors.background} style={styles.icon} />
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuText: {
        color: colors.background,
        textAlign: 'center',
        fontSize: 18,
        marginLeft: 10,
    },
    icon: {
        marginRight: 10,
    },
});
