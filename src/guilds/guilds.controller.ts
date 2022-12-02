import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BuyBadgeDto } from './dto/buy-badge.dto';
import { RaiseBadgeRequestDto } from './dto/raise-badge-request.dto';
import { UpdateBadgeRecordDto } from './dto/update-badge-record.dto';
import { UpdateBadgeRequestDto } from './dto/update-badge-request.dto';
import { GuildsService } from './guilds.service';

@ApiTags('guilds')
@Controller('guilds')
export class GuildsController {
  constructor(private readonly guildsService: GuildsService) {}

  @Get('getBadges/:publicKey')
  getBadges(@Param('publicKey') publicKey: string) {
    return this.guildsService.getBadges(publicKey);
  }

  @Post('buyBadge')
  buyBadge(@Body() body: BuyBadgeDto) {
    return this.guildsService.buyBadge(body);
  }

  @Post('updateBadgeRecord')
  updateBadgeRecord(@Body() body: UpdateBadgeRecordDto) {
    return this.guildsService.updateBadgeRecord(body);
  }

  @Post('raiseBadgeRequest')
  raiseBadgeRequest(@Body() body: RaiseBadgeRequestDto) {
    return this.guildsService.raiseBadgeRequest(body);
  }

  @Get('cancelBadgeRequest/:requestId')
  cancelBadgeRequest(@Param('requestId') requestId: string) {
    return this.guildsService.cancelBadgeRequest(requestId);
  }

  @Get('getLiveBadgeRequests')
  async getLiveBadgeRequests() {
    const liveBadgeRequests = await this.guildsService.getLiveBadgeRequests();
    const userIds = liveBadgeRequests.map((req) => req.requesterId);
    const minerInfo = this.guildsService.getMinerInfo(userIds);
    return liveBadgeRequests.map((request, index) => ({
      ...request,
      ...minerInfo[index],
    }));
  }

  @Post('updateBadgeRequest')
  async updateBadgeRequest(@Body() body: UpdateBadgeRequestDto) {
    return this.guildsService.updateBadgeRequest(body);
  }

  @Get('getLenderPortfolio/:publicKey')
  getLenderPortfolio(@Param('publicKey') publicKey: string) {
    return this.guildsService.getLenderPortfolio(publicKey);
  }
}
