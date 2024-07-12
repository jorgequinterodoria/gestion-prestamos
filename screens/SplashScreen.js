import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { colors } from '../styles'

const SplashScreen = ({ navigation }) => {
    useEffect(() => {

        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 4000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <FontAwesome name="money" size={150} color={colors.background} />
            <Text style={styles.text}>Inversiones MS</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.background,
    },
});

export default SplashScreen;
