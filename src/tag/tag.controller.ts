import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { MyJwtGuard } from '../auth/guard';
import { UpdateTagDTO } from './dto';
import { CreateTagDTO } from './dto/createTag.dto';
import { TagService } from './tag.service';

@UseGuards(MyJwtGuard)
@Controller('tags')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get()
  getTags(@GetUser('id') userId: number) {
    return this.tagService.getTags(userId);
  }

  @Post()
  createTag(@GetUser('id') userId: number, @Body() payload: CreateTagDTO) {
    return this.tagService.createTag(userId, payload);
  }

  @Patch(':id')
  updateTag(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) tagId: number,
    @Body() payload: UpdateTagDTO,
  ) {
    return this.tagService.updateTag(tagId, userId, payload);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTag(
    @Param('id', ParseIntPipe) tagId: number,
    @GetUser('id') userId: number,
  ) {
    return this.tagService.deleteTag(tagId, userId);
  }
}
