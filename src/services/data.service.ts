import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Medicamento } from '../types/Medicamento';

const STORAGE_KEY = '@MeuRemedioV2:medicamentos';

// obter todos os medicamentos 
async function fetchAllMedicamentos(): Promise<Medicamento[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Erro ao buscar medicamentos:", e);
    return [];
  }
}

// salvar todos os medicamentos
async function saveAllMedicamentos(medicamentos: Medicamento[]): Promise<void> {
  try {
    const jsonValue = JSON.stringify(medicamentos);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error("Erro ao salvar medicamentos:", e);
  }
}

// adicionar um medicamento
export async function addMedicamento(novoMedicamento: Medicamento): Promise<void> {
  const lista = await fetchAllMedicamentos();
  lista.push(novoMedicamento);
  await saveAllMedicamentos(lista);
}

// deletar um medicamento
export async function deleteMedicamento(medicamentoId: string): Promise<void> {
  let lista = await fetchAllMedicamentos();
  lista = lista.filter(m => m.id !== medicamentoId);
  await saveAllMedicamentos(lista);
}

// gerenciar a lista de medicamentos
export const useMedicamentos = () => {
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
    const [loading, setLoading] = useState(true);

    const refresh = async () => {
        setLoading(true);
        const lista = await fetchAllMedicamentos();
        setMedicamentos(lista);
        setLoading(false);
    }

    useEffect(() => {
        refresh();
    }, []);

    return { medicamentos, loading, refresh };
};