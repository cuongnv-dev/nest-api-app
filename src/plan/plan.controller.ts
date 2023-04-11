import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { MyJwtGuard } from '../auth/guard/myJwt.guard';
import { GetUser } from '../auth/decorator/user.decorator';
import { CreatePlanDTO } from './dto/createPlan.dto';
import { UpdatePlanDTO } from './dto';

@UseGuards(MyJwtGuard)
@Controller('plans')
export class PlanController {
  constructor(private planService: PlanService) {}
  @Get()
  getPlan(@GetUser('id') userId: number) {
    return this.planService.getPlan(userId);
  }

  @Post()
  createPlan(@GetUser('id') userId: number, @Body() payload: CreatePlanDTO) {
    return this.planService.createPlan(userId, payload);
  }

  @Patch(':id')
  updatePlan(
    @GetUser('id') userId: number,
    @Body() payload: UpdatePlanDTO,
    @Param('id', ParseIntPipe) planId: number,
  ) {
    return this.planService.updatePlan(userId, planId, payload);
  }
}
