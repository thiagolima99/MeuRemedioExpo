import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/ui/Card';
import { colors, spacing } from '../constants/theme';
// Update the import path below if ListItem exists elsewhere, e.g.:
import { ListItem } from '../src/components/ListItem';
import { deleteMedicamento, useMedicamentos } from '../src/services/data.service';
import { Medicamento } from '../src/types/Medicamento';

export default function ListaMedicamentosScreen() {
    // Observa a lista no banco e atualiza
    const { medicamentos, loading, refresh } = useMedicamentos();

    // Quando a tela é focada atualiza a lista
    useEffect(() => {
        refresh();
    }, []);

    const handleLongPress = (medicamento: Medicamento) => {
        // Simula AlertDialog.Builder (Substitui a lógica de alerta nativa)
        Alert.alert(
            "Remover Medicamento",
            `Deseja remover o medicamento '${medicamento.nome}'?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Sim",
                    onPress: async () => {
                        try {
                            // 1. Cancela a notificação/alarme
                            await Notifications.cancelScheduledNotificationAsync(medicamento.notificationId);
                            
                            // 2. Deleta do "banco" (Substitui viewModel.deletar)
                            await deleteMedicamento(medicamento.id);
                            
                            // 3. Atualiza a UI
                            await refresh();
                            Alert.alert("Sucesso", "Removido com sucesso!");
                        } catch (e) {
                            Alert.alert("Erro", "Falha ao remover medicamento.");
                        }
                    },
                },
            ]
        );
    };

    if (loading) {
        return <Text style={styles.loadingText}>Carregando...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Medicamentos Salvos</Text>
            <FlatList
                data={medicamentos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card style={{ marginHorizontal: spacing.s, marginVertical: spacing.s }}>
                        <ListItem medicamento={item} onLongPress={handleLongPress} />
                    </Card>
                )}
                contentContainerStyle={{ paddingBottom: spacing.l }}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>Nenhum medicamento cadastrado.</Text>
                )}
            />
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.l,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: spacing.l,
        textAlign: 'center',
    },
    loadingText: {
        color: colors.text,
        textAlign: 'center',
        marginTop: spacing.l,
    },
    emptyText: {
        color: colors.muted,
        textAlign: 'center',
        marginTop: spacing.xl,
        fontSize: 18,
    },
});