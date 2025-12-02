import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import AppLayout from './_layout'; // Importa o layout do router

// Configura o handler para quando a notificação é recebida em primeiro plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Listener de Notificações em Background (Substitui AlarmeReceiver)
// Quando uma notificação agendada é recebida (mesmo em background)
Notifications.addNotificationReceivedListener(notification => {
  // Se o aplicativo estiver em background, esta função pode não ser executada
  // imediatamente no Expo Go. Em um build, você pode usar um background task.
  const nomeMedicamento = notification.request.content.data.nome;
  console.log(`Alarme disparado: ${nomeMedicamento}`);
  // tocarSom(); // Descomentar se quiser som contínuo que precisa de 'Parar Alarme'
});

export default function App() {
  useEffect(() => {
    // Escuta a interação do usuário com a notificação
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      // Exemplo de como reagir ao clique na notificação
      console.log('Notificação clicada:', response.notification.request.content.data.nome);
    });

    return () => subscription.remove();
  }, []);

  // Usa o Expo Router para gerenciar o layout e as rotas
  return <AppLayout />; 
}