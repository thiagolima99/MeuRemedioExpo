import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from '../components/ui/Button';
import { colors, spacing } from '../constants/theme';
import { pararSom, requestAlarmPermissions } from '../src/services/alarm.service';

const tipos = [
    { label: 'Comprimido', value: 'Comprimido', icon: () => <Image source={require('../assets/comprimido.png')} style={{ width: 24, height: 24 }} /> },
    { label: 'Gotas', value: 'Gotas', icon: () => <Image source={require('../assets/gotas.png')} style={{ width: 24, height: 24 }} /> },
    { label: 'Inalação', value: 'Inalação', icon: () => <Image source={require('../assets/inalador.png')} style={{ width: 24, height: 24 }} /> },
    { label: 'Injeção', value: 'Injeção', icon: () => <Image source={require('../assets/injecao.png')} style={{ width: 24, height: 24 }} /> },
];

export default function TelaInicial() {
    useEffect(() => {
        requestAlarmPermissions();
    }, []);

    const [open, setOpen] = useState(false);
    const [tipoSelecionado, setTipoSelecionado] = useState(null);
    const [items, setItems] = useState(tipos);

    const navegarParaDetalhes = () => {
        if (tipoSelecionado) {
            router.push({ pathname: '/detalhes', params: { tipo: tipoSelecionado } });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Meu Remédio</Text>
            <Image source={require('../assets/icone.png')} style={styles.image} />
            <Text style={styles.title}>Selecione o tipo de medicamento</Text>
            <Button
                title="Ver Remédios Salvos"
                onPress={() => router.push('/lista')}
                style={{ marginBottom: spacing.l, backgroundColor: colors.secondary }}
            />
            <DropDownPicker
                open={open}
                value={tipoSelecionado}
                items={items}
                setOpen={setOpen}
                setValue={setTipoSelecionado}
                setItems={setItems}
                placeholder="Escolha o tipo"
                style={{ marginBottom: spacing.l, borderColor: colors.primary, zIndex: 1000 }}
                dropDownContainerStyle={{ borderColor: colors.primary, zIndex: 1000 }}
                listItemLabelStyle={{ color: colors.text }}
                zIndex={1000}
            />
            <Button
                title="Avançar"
                onPress={navegarParaDetalhes}
                style={{ marginTop: spacing.m, backgroundColor: colors.primary }}
                disabled={!tipoSelecionado}
            />
            <View style={{ width: '100%', marginTop: spacing.l }}>
                <Button title="Parar Alarme" onPress={pararSom} style={{ backgroundColor: colors.danger }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.l,
        alignItems: 'center',
    },
    header: {
        fontSize: 34,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
        backgroundColor: colors.primary,
        color: '#fff',
        width: '100%',
        marginBottom: spacing.l,
        borderRadius: 12,
        paddingVertical: spacing.s,
    },
    image: {
        width: 156,
        height: 142,
        resizeMode: 'contain',
        marginBottom: spacing.l,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: colors.text,
        marginBottom: spacing.m,
    },
});