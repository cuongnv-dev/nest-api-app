import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlanDTO, UpdatePlanDTO } from './dto';

@Injectable()
export class PlanService {
  constructor(private prismaService: PrismaService) {}

  async getPlan(userId: number) {
    return this.prismaService.plan.findMany({
      where: { userId },
    });
  }

  async createPlan(userId: number, payload: CreatePlanDTO) {
    return this.prismaService.plan.create({
      data: { ...payload, userId },
    });
  }

  async updatePlan(userId: number, planId: number, payload: UpdatePlanDTO) {
    const plan = await this.prismaService.plan.findUnique({
      where: { id: planId },
    });

    if (!plan || plan.userId !== userId) {
      throw new NotFoundException('Plan not found');
    }

    return this.prismaService.plan.update({
      where: { id: planId },
      data: { ...payload },
    });
  }
}
