import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Headers,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MonitorsService } from './monitors.service';
import { CreateMonitorDto } from './dto/create-monitor.dto';
import { UpdateMonitorDto } from './dto/update-monitor.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('monitors')
export class MonitorsController {
  constructor(
    private monitorsService: MonitorsService,
    private config: ConfigService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@CurrentUser() user: { id: string }, @Body() dto: CreateMonitorDto) {
    return this.monitorsService.create(user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@CurrentUser() user: { id: string }) {
    return this.monitorsService.findAllForUser(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@CurrentUser() user: { id: string }, @Param('id') id: string) {
    return this.monitorsService.findOne(user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
    @Body() dto: UpdateMonitorDto,
  ) {
    return this.monitorsService.update(user.id, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@CurrentUser() user: { id: string }, @Param('id') id: string) {
    return this.monitorsService.remove(user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/check')
  check(@CurrentUser() user: { id: string }, @Param('id') id: string) {
    return this.monitorsService.check(user.id, id);
  }

  @Post('check-all')
  checkAll(@Headers('x-cron-secret') secret: string) {
    const expected = this.config.get<string>('CRON_SECRET');
    if (!expected || secret !== expected) {
      throw new ForbiddenException('Invalid cron secret');
    }
    return this.monitorsService.checkAll();
  }
}
