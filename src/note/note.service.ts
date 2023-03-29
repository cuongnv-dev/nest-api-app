import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InsertNoteDTO } from './dto/insert.note.dto';
import { UpdateNoteDTO } from './dto/update.note.dto';

@Injectable()
export class NoteService {
  constructor(private prismaService: PrismaService) {}

  getNotes(userId: number) {
    return this.prismaService.note.findMany({ where: { userId } });
  }

  async getNoteById(noteId: number) {
    const note = await this.prismaService.note.findUnique({
      where: { id: noteId },
      include: {
        user: true,
      },
    });

    delete note.user.hashedPassword;

    if (!note) {
      throw new NotFoundException();
    }

    return note;
  }

  async insertNote(userId: number, insertNoteDto: InsertNoteDTO) {
    const note = await this.prismaService.note.create({
      data: {
        ...insertNoteDto,
        userId: userId,
      },
    });
    return note;
  }

  async updateNoteById(noteId: number, updateNoteDTO: UpdateNoteDTO) {
    const note = await this.prismaService.note.findUnique({
      where: { id: noteId },
    });
    if (!note) {
      throw new NotFoundException('Cannot find Note to update');
    }
    return this.prismaService.note.update({
      where: {
        id: noteId,
      },
      data: { ...updateNoteDTO },
    });
  }

  async deleteNoteById(noteId: number) {
    const note = await this.prismaService.note.findUnique({
      where: { id: noteId },
    });
    if (!note) {
      throw new NotFoundException('Cannot find Note to delete');
    }

    return this.prismaService.note.delete({
      where: {
        id: noteId,
      },
    });
  }
}
