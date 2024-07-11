import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { UserProvider } from './providers/UserProvider';
import { Router } from './components/router/Router';
import { WSProvider } from './providers/wsProvider';
import {
  FirebaseMessaging,
  GetTokenOptions,
} from "@capacitor-firebase/messaging";
import { PushNotificationSchema, PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';
import { useEffect } from 'react';

function App() {
  // Push notifications
  useEffect(() => {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      console.log('Push registration success, token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      console.log('Push received: ' + JSON.stringify(notification));
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      console.log('Push action performed: ' + JSON.stringify(notification));
    });
  }, [])

  return (
    <UserProvider>
      <WSProvider>
        <Router />
      </WSProvider>
    </UserProvider>
  );
}

export default App;
