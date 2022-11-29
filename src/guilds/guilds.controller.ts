import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BuyBadgeDto } from './dto/buy-badge.dto';
import { RaiseBadgeRequestDto } from './dto/raise-badge-request.dto';
import { RentBadgeDto } from './dto/rent-badge.dto';
import { UpdateBadgeHistoryDto } from './dto/update-badge-history.dto';
import { GuildsService } from './guilds.service';

@ApiTags('guilds')
@Controller('guilds')
export class GuildsController {
  constructor(private readonly guildsService: GuildsService) {}

  @Post('buyBadge')
  buyBadge(@Body() body: BuyBadgeDto) {
    return this.guildsService.buyBadge(body);
  }

  @Post('updateBadgeHistory')
  updateBadgeHistory(@Body() body: UpdateBadgeHistoryDto) {
    return this.guildsService.updateBadgeHistory(body);
  }

  @Post('raiseBadgeRequest')
  raiseBadgeRequest(@Body() body: RaiseBadgeRequestDto) {
    body.status = 'pending';
    return this.guildsService.raiseBadgeRequest(body);
  }

  @Get('cancelBadgeRequest/:id')
  cancelBadgeRequest(@Param('id') id: string) {
    return this.guildsService.cancelBadgeRequest(id);
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

  @Get('getBadges/:publicKey')
  async getBadges(@Param('publicKey') publicKey: string) {
    return await this.guildsService.getBadges(publicKey);
  }

  @Post('rentBadge')
  rentBadge(@Body() body: RentBadgeDto) {
    body.status = 'draft';
    return this.guildsService.rentBadge(body);
  }
}
