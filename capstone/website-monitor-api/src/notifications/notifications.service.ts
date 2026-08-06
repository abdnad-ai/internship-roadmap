import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async findAllForUser(userId: string) {
    return this.prisma.notification.findMany({
      where: { monitor: { userId } },
      orderBy: { createdAt: 'desc' },
      include: {
        monitor: { select: { id: true, url: true, condition: true } },
      },
    });
  }

  async markRead(userId: string, id: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
      include: { monitor: true },
    });
    if (!notification || notification.monitor.userId !== userId) {
      return null;
    }
    return this.prisma.notification.update({
      where: { id },
      data: { read: true },
    });
  }

  async markAllRead(userId: string) {
    const result = await this.prisma.notification.updateMany({
      where: { monitor: { userId }, read: false },
      data: { read: true },
    });
    return { updated: result.count };
  }
}
