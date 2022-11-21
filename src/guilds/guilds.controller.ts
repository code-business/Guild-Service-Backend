import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateBadgeRequestDto } from './dto/create-badge-request.dto';
import { GuildsService } from './guilds.service';

@ApiTags('guilds')
@Controller('guilds')
export class GuildsController {
  constructor(private readonly guildsService: GuildsService) {}

  @Post('createBadgeRequest')
  createBadgeRequest(@Body() createBadgeRequestDto: CreateBadgeRequestDto) {
    return this.guildsService.createBadgeRequest(createBadgeRequestDto);
  }

  @Get('getLiveBadgeRequests')
  async getLiveBadgeRequests() {
    const liveBadgeRequests = await this.guildsService.getLiveBadgeRequests();
    const userIds = liveBadgeRequests.map((req) => req.requesterId);
    const userData = this.guildsService.getUserData(userIds);
    const userStats = this.guildsService.getUserStats(userIds);
    const response = liveBadgeRequests.map(
      (
        { _id, requesterId, requesterPublicKey, name, joinDate, badgeType },
        index,
      ) => ({
        _id,
        requesterId,
        requesterPublicKey,
        name,
        joinDate,
        badgeType,
        ...userData[index],
        ...userStats[index],
      }),
    );
    return response;
  }
}
