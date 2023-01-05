import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from './dtos/create-notification-body';
import { SendNotificationUseCase } from 'src/application/use-cases/send-notification';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotificationUseCase } from '@application/use-cases/cancel-notification';
import { ReadNotificationUseCase } from '@application/use-cases/read-notification';
import { UnreadNotificationUseCase } from '@application/use-cases/unread-notification';
import { CountRecipientNotificationsUseCase } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotificationsUseCase } from '@application/use-cases/get-recipient-notifications';
import { CountRecipientNotificationsResponse } from './dtos/count-recipient-notifications-response';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase,
    private readonly cancelNotificationUseCase: CancelNotificationUseCase,
    private readonly readNotificationUseCase: ReadNotificationUseCase,
    private readonly unreadNotificationUseCase: UnreadNotificationUseCase,
    private readonly countRecipientNotificationsUseCase: CountRecipientNotificationsUseCase,
    private readonly getRecipientNotificationsUseCase: GetRecipientNotificationsUseCase,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotificationUseCase.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<CountRecipientNotificationsResponse> {
    const { count } = await this.countRecipientNotificationsUseCase.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get('from/:recipientId')
  async getFronRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } =
      await this.getRecipientNotificationsUseCase.execute({
        recipientId,
      });

    return notifications.map(NotificationViewModel.toHTTP);
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotificationUseCase.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotificationUseCase.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      recipientId,
      content,
      category,
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }
}
