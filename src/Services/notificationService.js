// notificationService.js

import PushNotification from 'react-native-push-notification';

class NotificationService {
  configure = () => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  };

  scheduleDownloadNotification = () => {
    PushNotification.localNotification({
      title: 'Download Complete',
      message: 'Your file has been downloaded successfully!',
    });
  };
}

const notificationService = new NotificationService();

export default notificationService;
