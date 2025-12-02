export interface Medicamento {
  id: string; // ID único para AsyncStorage/Notificações
  nome: string;
  tipo: 'Comprimido' | 'Gotas' | 'Inalação' | 'Injeção';
  frequenciaHoras: number; // Manteve a frequência do Kotlin
  horarioInicial: { hora: number; minuto: number; }; // Hora para o primeiro alarme
  notificationId: string; // ID da notificação do Expo
}