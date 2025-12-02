import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ 
      headerStyle: { backgroundColor: '#33B418' },
      headerTintColor: '#121111',
      headerTitleStyle: { fontWeight: 'bold' }
    }}>
      <Stack.Screen name="index" options={{ title: "Meu Remédio" }} />
      <Stack.Screen name="detalhes" options={{ title: "Detalhes" }} />
      <Stack.Screen name="frequencia" options={{ title: "Frequência" }} />
      <Stack.Screen name="lista" options={{ title: "Medicamentos Salvos" }} />
    </Stack>
  );
}