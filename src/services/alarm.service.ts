import { Audio } from 'expo-av';
import * as Notifications from 'expo-notifications';
import { Medicamento } from '../types/Medicamento';

let soundObject: Audio.Sound | null = null;

// Solicita permissões de notificação e alarmes
export async function requestAlarmPermissions() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        alert('É necessário permitir notificações para os alarmes funcionarem!');
    }
}

// Agendar um alarme
export async function scheduleMedicamentoAlarm(medicamento: Medicamento): Promise<string> {
  
  await Notifications.cancelScheduledNotificationAsync(medicamento.notificationId);


  let dataAgendamento = new Date();
  dataAgendamento.setHours(medicamento.horarioInicial.hora);
  dataAgendamento.setMinutes(medicamento.horarioInicial.minuto);
  dataAgendamento.setSeconds(0);

  // Se o horário já passou hoje agenda para amanhã
  if (dataAgendamento < new Date()) {
    dataAgendamento.setDate(dataAgendamento.getDate() + 1);
  }

  // 2. Agendar a notificação
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hora do Remédio 💊", 
      body: `Hora de tomar o remédio ${medicamento.nome} (${medicamento.tipo}).`,
      data: { nome: medicamento.nome },
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
    },
    trigger: {
      hour: medicamento.horarioInicial.hora,
      minute: medicamento.horarioInicial.minuto,
      repeats: true, // Repete todo dia
    },
  });

  return notificationId;
}

// Tocar o som do alarme
export async function tocarSom() {
    if (soundObject) return; // Já tocando

    try {
        const { sound } = await Audio.Sound.createAsync(
            { uri: 'URL_DO_SEU_SOM_ALARME' }
        );
        soundObject = sound;
        await soundObject.setVolumeAsync(1.0);
        await soundObject.setIsLoopingAsync(true);
        await soundObject.playAsync();
    } catch (error) {
        console.log("Erro ao tocar som:", error);
    }
}

// Parar o som do alarme
export async function pararSom() {
    if (soundObject) {
        await soundObject.stopAsync();
        await soundObject.unloadAsync();
        soundObject = null;
    }
    await Notifications.dismissAllNotificationsAsync();
}