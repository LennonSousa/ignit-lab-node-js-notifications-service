import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { UnreadNotificationUseCase } from './unread-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Unread nofiticaiton', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotificationUseCase(
      notificationsRepository,
    );

    const nofiticaiton = makeNotification({
      reatAt: new Date(),
    });

    await notificationsRepository.create(nofiticaiton);

    await unreadNotification.execute({
      notificationId: nofiticaiton.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a notification when it does not exists', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotificationUseCase(
      notificationsRepository,
    );

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
