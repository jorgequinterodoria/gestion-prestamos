// styles.js
import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#2196F3',
    secondary: '#03A9F4',
    background: '#FFFFFF',
    text: '#212121',
    border: '#2196F3',
};


export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: colors.primary,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: colors.background,
        textAlign: 'center',
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: colors.border,
        marginBottom: 10,
    },
});
