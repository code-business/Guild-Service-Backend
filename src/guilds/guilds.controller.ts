import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateBadgeRequestDto } from './dto/create-badge-request.dto';
import { CreateBorrowerEarningHistoryDto } from './dto/create-borrower-earning-history.dto';
import { CreateBorrowerEarningStatDto } from './dto/create-borrower-earning-stat.dto';
import { CreateLenderInfoDto } from './dto/create-lender-info.dto';
import { GuildsService } from './guilds.service';

@ApiTags('guilds')
@Controller('guilds')
export class GuildsController {
  constructor(private readonly guildsService: GuildsService) {}

  @Get('totalBadgeRequests/:userId')
  totalBadgeRequests(@Param('userId') userId: string) {
    return this.guildsService.totalBadgeRequests(userId);
  }

  @Post('createBadgeRequest')
  createBadgeRequest(@Body() createBadgeRequestDto: CreateBadgeRequestDto) {
    return this.guildsService.createBadgeRequest(createBadgeRequestDto);
  }

  @Post('createBorrowerEarningStat')
  createBorrowerEarningStat(
    @Body() createBorrowerEarningStatDto: CreateBorrowerEarningStatDto,
  ) {
    return this.guildsService.createBorrowerEarningStat(
      createBorrowerEarningStatDto,
    );
  }

  @Post('createBorrowerEarningHistory')
  createBorrowerEarningHistory(
    @Body() createBorrowerEarningHistoryDto: CreateBorrowerEarningHistoryDto,
  ) {
    return this.guildsService.createBorrowerEarningHistory(
      createBorrowerEarningHistoryDto,
    );
  }

  @Post('createLenderInfo')
  createLenderInfo(@Body() createLenderInfoDto: CreateLenderInfoDto) {
    return this.guildsService.createLenderInfo(createLenderInfoDto);
  }

  @Get('getAllBadgeRequests')
  getAllBadgeRequests() {
    return this.guildsService.getAllBadgeRequests();
  }

  @Get('getAllBorrowerEarningStats')
  getAllBorrowerEarningStats() {
    return this.guildsService.getAllBorrowerEarningStats();
  }

  @Get('getAllBorrowerEarningHistory')
  getAllBorrowerEarningHistory() {
    return this.guildsService.getAllBorrowerEarningHistory();
  }

  @Get('getAllLendingInfo')
  getAllLendingInfo() {
    return this.guildsService.getAllLenderInfo();
  }
}
