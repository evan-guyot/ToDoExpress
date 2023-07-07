export interface INotification {
  state: ENotificationState;
  title: string;
  message: string | undefined;
}

enum ENotificationState {
  fail,
  success,
}
