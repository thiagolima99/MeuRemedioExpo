import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../components/ui/Button';
import { colors, spacing } from '../constants/theme';

export default function DetalhesScreen() {
    const { tipo } = useLocalSearchParams();
    const [nome, setNome] = useState('');

    const tipoMedicamento = typeof tipo === 'string' ? tipo : 'Desconhecido';

    const handleProximo = () => {
        if (nome.trim().length > 0) {
            
            router.push({
                pathname: '/frequencia',
                params: { nome, tipo: tipoMedicamento },
            });
        } else {
            Alert.alert("Atenção", "Digite o nome do medicamento!");
        }
    };

    // ...
    return (
        <View style={styles.container}>
            <Text style={styles.infoText}>Tipo selecionado: {tipoMedicamento}</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o nome do medicamento"
                placeholderTextColor={colors.muted}
                value={nome}
                onChangeText={setNome}
            />
            <Button
                title="Próximo"
                onPress={handleProximo}
                style={{ marginTop: spacing.m, backgroundColor: colors.primary }}
            />
        </View>
    );
}

// ...
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.l,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: {
        color: colors.text,
        fontSize: 18,
        marginBottom: spacing.l,
        textAlign: 'center',
    },
    input: {
        height: 48,
        width: '100%',
        borderColor: colors.primary,
        borderWidth: 1,
        borderRadius: 8,
        color: colors.text,
        paddingHorizontal: 12,
        marginBottom: spacing.l,
        marginTop: spacing.m,
        backgroundColor: '#fff',
    },
});