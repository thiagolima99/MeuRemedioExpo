import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import AppLayout from './_layout';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


Notifications.addNotificationReceivedListener(notification => {

  const nomeMedicamento = notification.request.content.data.nome;
  console.log(`Alarme disparado: ${nomeMedicamento}`);
  
});

export default function App() {
  useEffect(() => {
    
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      
      console.log('Notificação clicada:', response.notification.request.content.data.nome);
    });

    return () => subscription.remove();
  }, []);

 
  return <AppLayout />; 
}