import { useEffect } from "react"
import { 
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { updateCurrentUser } from "../../../utils/ApiClient";
import { useUser } from "../../../providers/UserProvider";

export function PushNotificationConnection() {
  const { user } = useUser();

  useEffect(() => {
    if (user?.id) {
      PushNotifications.register();
    }
  }, [user?.id])

  PushNotifications.addListener('registration', (token: Token) => {
    syncFcmToken(token.value);
  });

  const syncFcmToken = (token: string) => {
    updateCurrentUser(token);
  }

  return null
}