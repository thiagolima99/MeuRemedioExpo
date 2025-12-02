import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Medicamento } from '../types/Medicamento';

interface ListItemProps {
    medicamento: Medicamento;
    onLongPress: (medicamento: Medicamento) => void; // Simula onItemLongClick
}

export const ListItem: React.FC<ListItemProps> = ({ medicamento, onLongPress }) => {
    return (
        <Pressable 
            onLongPress={() => onLongPress(medicamento)}
            style={styles.card}
        >
            <View style={styles.content}>
                <Text style={styles.textNome}>{medicamento.nome}</Text>
                <Text style={styles.textTipo}>{medicamento.tipo}</Text>
                <Text style={styles.textFrequencia}>
                    A cada {medicamento.frequenciaHoras} horas
                </Text>
                <Text style={styles.textFrequencia}>
                    Início: {String(medicamento.horarioInicial.hora).padStart(2, '0')}:
                    {String(medicamento.horarioInicial.minuto).padStart(2, '0')}
                </Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 8,
        borderRadius: 8,
        elevation: 4, // Sombra Android
        backgroundColor: '#33B418', // Cor de fundo do item
    },
    content: {
        padding: 16,
        backgroundColor: '#33B418',
        borderRadius: 8,
    },
    textNome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#121111',
    },
    textTipo: {
        fontSize: 16,
        color: '#121111',
    },
    textFrequencia: {
        fontSize: 16,
        color: '#121111',
    },
});