import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTagDTO } from './dto';
import { CreateTagDTO } from './dto/createTag.dto';

@Injectable()
export class TagService {
  constructor(private prismaService: PrismaService) {}

  async getTags(userId: number) {
    return this.prismaService.tag.findMany({
      where: {
        OR: [
          {
            userId: userId,
          },
          { isDefault: true },
        ],
      },
    });
  }

  async createTag(userId: number, payload: CreateTagDTO) {
    return this.prismaService.tag.create({
      data: { ...payload, userId },
    });
  }

  async updateTag(tagId: number, userId: number, payload: UpdateTagDTO) {
    const tag = await this.prismaService.tag.findUnique({
      where: { id: tagId },
    });

    if (!tag || tag.isDefault || tag.userId !== userId) {
      throw new NotFoundException('Cannot update this tag');
    }

    return this.prismaService.tag.update({
      where: {
        id: tagId,
      },
      data: {
        ...payload,
      },
    });
  }

  async deleteTag(tagId: number, userId: number) {
    const tag = await this.prismaService.tag.findUnique({
      where: { id: tagId },
    });

    if (!tag || tag.isDefault || tag.userId !== userId) {
      throw new NotFoundException('Cannot delete this tag');
    }

    return this.prismaService.tag.delete({ where: { id: tagId } });
  }
}
