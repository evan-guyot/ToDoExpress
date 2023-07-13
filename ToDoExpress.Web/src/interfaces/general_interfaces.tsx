export interface INotification {
  state: ENotificationState;
  title: string;
  message: string | undefined;
}

enum ENotificationState {
  fail,
  success,
}

export class IError {
  mainMessage: string;
  subMessages: string[] | undefined;

  constructor(mainMessage: string, subMessages: string[] | undefined) {
    this.mainMessage = mainMessage;
    this.subMessages = subMessages;
  }
}
