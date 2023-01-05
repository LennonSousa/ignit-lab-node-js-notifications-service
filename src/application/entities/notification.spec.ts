import { Content } from './content';
import { Notification } from './notification';

describe('Notification content', () => {
  it('should be able to create a notificaton', () => {
    const notification = new Notification({
      content: new Content('Você recebeu uma solicitação de amizade'),
      category: 'social',
      recipientId: 'example-recipiend-id',
    });

    expect(notification).toBeTruthy();
  });
});
