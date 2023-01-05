import { Module } from '@nestjs/common';
import { SendNotificationUseCase } from '@application/use-cases/send-notification';
import { DatabaseModule } from '@infra/database/database.module';
import { NotificationsController } from './notifications.controller';
import { CancelNotificationUseCase } from '@application/use-cases/cancel-notification';
import { CountRecipientNotificationsUseCase } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotificationsUseCase } from '@application/use-cases/get-recipient-notifications';
import { ReadNotificationUseCase } from '@application/use-cases/read-notification';
import { UnreadNotificationUseCase } from '@application/use-cases/unread-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    CountRecipientNotificationsUseCase,
    GetRecipientNotificationsUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
  ],
})
export class HttpModule {}
