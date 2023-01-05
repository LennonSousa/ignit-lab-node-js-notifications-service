import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { ReadNotificationUseCase } from './read-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Read nofiticaiton', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotificationUseCase(
      notificationsRepository,
    );

    const nofiticaiton = makeNotification();

    await notificationsRepository.create(nofiticaiton);

    await readNotification.execute({
      notificationId: nofiticaiton.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a notification when it does not exists', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotificationUseCase(
      notificationsRepository,
    );

    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
