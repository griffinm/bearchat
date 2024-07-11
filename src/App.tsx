import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { UserProvider } from './providers/UserProvider';
import { Router } from './components/router/Router';
import { WSProvider } from './providers/wsProvider';
import { PushNotifications } from '@capacitor/push-notifications';
import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { PushNotificationConnection } from './pages/chat/components/PushNotificationConnection';

function App() {
  // Push notifications
  const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
  useEffect(() => {
    if (isPushNotificationsAvailable) {
      PushNotifications.requestPermissions();
    }
  }, [isPushNotificationsAvailable])

  return (
    <UserProvider>
      {isPushNotificationsAvailable && <PushNotificationConnection />}
      <WSProvider>
        <Router />
      </WSProvider>
    </UserProvider>
  );
}

export default App;
