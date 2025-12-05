export interface Medicamento {
  id: string; 
  nome: string;
  tipo: 'Comprimido' | 'Gotas' | 'Inalação' | 'Injeção';
  frequenciaHoras: number; 
  horarioInicial: { hora: number; minuto: number; }; 
  notificationId: string; 
}