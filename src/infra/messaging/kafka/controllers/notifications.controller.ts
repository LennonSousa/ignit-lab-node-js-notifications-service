import { SendNotificationUseCase } from '@application/use-cases/send-notification';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

interface SendNotificationPayload {
  content: string;
  category: string;
  recipientId: string;
}

@Controller()
export class NotificationsControler {
  constructor(
    private readonly sendNotiticatonUseCase: SendNotificationUseCase,
  ) {}

  @EventPattern('notifications-send-notification')
  async handleSendNotificationi(
    @Payload() { content, category, recipientId }: SendNotificationPayload,
  ) {
    await this.sendNotiticatonUseCase.execute({
      content,
      category,
      recipientId,
    });
  }
}
