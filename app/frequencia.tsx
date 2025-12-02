import DateTimePicker from '@react-native-community/datetimepicker';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../components/ui/Button';
import { colors, spacing } from '../constants/theme';
import { scheduleMedicamentoAlarm } from '../src/services/alarm.service';
import { addMedicamento } from '../src/services/data.service';
import { Medicamento } from '../src/types/Medicamento';

export default function FrequenciaScreen() {
    const { nome, tipo } = useLocalSearchParams();
    
    // Assegura que nome e tipo são strings (como no Kotlin)
    const nomeMedicamento = typeof nome === 'string' ? nome : 'Desconhecido';
    const tipoMedicamento = typeof tipo === 'string' ? (tipo as Medicamento['tipo']) : 'Comprimido';

    const [frequencia, setFrequencia] = useState(''); // Não usado na lógica do alarme simples
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const horaSelecionada = date.getHours();
    const minutoSelecionado = date.getMinutes();

    const handleTimeChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const handleSalvar = async () => {
        const hora = horaSelecionada;
        const minuto = minutoSelecionado;
        const freqHoras = parseInt(frequencia) || 24;
        try {
            const novoMedicamento: Medicamento = {
                id: uuidv4(),
                nome: nomeMedicamento,
                tipo: tipoMedicamento,
                frequenciaHoras: freqHoras,
                horarioInicial: { hora, minuto },
                notificationId: '',
            };
            let notificationId = '';
            try {
                notificationId = await scheduleMedicamentoAlarm(novoMedicamento);
            } catch (e) {
                // Se falhar no web, apenas loga e segue
                if (typeof window !== 'undefined') {
                    console.warn('Agendamento de alarme não suportado no web.');
                } else {
                    throw e;
                }
            }
            await addMedicamento({ ...novoMedicamento, notificationId });
            Alert.alert(
                "Sucesso",
                `Medicamento salvo! Alarme definido para ${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')}`
            );
            // Navega para a tela inicial (Substitui startActivity/finish)
            setTimeout(() => {
                router.replace('/');
            }, 500);
        } catch (e) {
            console.error(e);
            Alert.alert("Erro", "Falha ao salvar medicamento ou agendar alarme.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.infoText}>{`Informações do medicamento:\n\nNome: ${nomeMedicamento}\nTipo: ${tipoMedicamento}`}</Text>
            <TextInput
                style={styles.inputFrequencia}
                placeholder="Digite a frequência (ex.: 6 em 6 horas)"
                placeholderTextColor={colors.muted}
                keyboardType="numeric"
                value={frequencia}
                onChangeText={setFrequencia}
            />
            <Button
                title="Selecionar horário"
                onPress={() => setShowPicker(true)}
                style={{ backgroundColor: colors.secondary, marginBottom: spacing.s }}
            />
            <Text style={styles.horarioSelecionadoText}>
                Horário Selecionado: {String(horaSelecionada).padStart(2, '0')}:{String(minutoSelecionado).padStart(2, '0')}
            </Text>
            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={handleTimeChange}
                />
            )}
            <Button
                title="Salvar"
                onPress={handleSalvar}
                style={{ backgroundColor: colors.primary, marginTop: spacing.m }}
            />
        </View>
    );
}

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
        textAlign: 'left',
        padding: spacing.s,
        width: '100%',
    },
    inputFrequencia: {
        height: 48,
        width: '100%',
        borderColor: colors.primary,
        borderWidth: 1,
        borderRadius: 8,
        color: colors.text,
        paddingHorizontal: spacing.m,
        marginBottom: spacing.m,
        textAlign: 'center',
        backgroundColor: '#fff',
    },
    horarioSelecionadoText: {
        color: colors.muted,
        fontSize: 16,
        padding: spacing.s,
        marginTop: spacing.m,
        marginBottom: spacing.m,
    },
});