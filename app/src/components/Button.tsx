import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    color?: string;
    backgroundColor?: string;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, color = '#fff', backgroundColor = '#007BFF' }) => {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={onPress}>
            <Text style={[styles.text, { color }]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default Button;