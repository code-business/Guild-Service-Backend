import { Metadata } from '@metaplex-foundation/js';
import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  BadgeRecordStatusEnum,
  BadgeTypeEnum,
} from 'src/shared/enum/guilds.enum';
import constant from '../constants';
import { BuyBadgeDto } from './dto/buy-badge.dto';
import { RaiseBadgeRequestDto } from './dto/raise-badge-request.dto';
import { UpdateBadgeRecordDto } from './dto/update-badge-record.dto';
import { UpdateBadgeRequestDto } from './dto/update-badge-request.dto';
import { GuildsService } from './guilds.service';

@ApiTags('guilds')
@Controller('guilds')
export class GuildsController {
  constructor(
    private readonly guildsService: GuildsService,
    private readonly httpService: HttpService,
  ) {}

  @Get('getBadges/:publicKey')
  async getBadges(@Param('publicKey') publicKey: string) {
    try {
      const badgeRecords = await this.guildsService.getBadgeRecords(publicKey);
      if (!badgeRecords.length) {
        const myNfts = await this.guildsService.getMyBadges(publicKey);
        for (const metadata of myNfts) {
          const { mintAddress, name, symbol } = metadata as Metadata;
          if (
            symbol === 'GARI' &&
            (name === 'Iron Creator' || name === 'Iron User')
          ) {
            const badgeRecord = {
              publicKey,
              mintAddress,
              badgeType:
                name === 'Iron Creator'
                  ? BadgeTypeEnum.CREATOR
                  : BadgeTypeEnum.USER,
              status: BadgeRecordStatusEnum.SUCCESS,
            };
            const newBadgeRecord = await this.guildsService.addBadgeRecord(
              badgeRecord,
            );
            badgeRecords.push(newBadgeRecord);
          }
        }
      }
      return badgeRecords;
    } catch (error) {
      return {
        code: 400,
        message: 'Error',
        error: error.message,
      };
    }
  }

  @Post('buyBadge')
  async buyBadge(@Body() body: BuyBadgeDto) {
    try {
      const { publicKey, badgeType } = body;
      const response = await this.httpService.axiosRef.post(
        `${constant.NFT_SERVICE_URL}/nft/V2/create`,
        {
          usdToGari: 1,
          userPublicKey: publicKey,
          badge: '2x',
          type: badgeType,
          feePayer: publicKey,
        },
      );
      const rawTransaction = response.data.transaction;
      const mintAddress = this.guildsService.getMintAddress(rawTransaction);
      const badgeRecord = await this.guildsService.addDraftBadgeRecord(
        publicKey,
        badgeType,
        mintAddress,
      );
      return { badgeRecord, rawTransaction };
    } catch (error) {
      return {
        code: 400,
        message: 'Error',
        error: error.message,
      };
    }
  }

  @Post('updateBadgeRecord')
  async updateBadgeRecord(@Body() body: UpdateBadgeRecordDto) {
    try {
      const { publicKey, badgeType, mintAddress } = body;
      const response = await this.guildsService.updateBadgeRecord(
        publicKey,
        badgeType,
        mintAddress,
      );
    } catch (error) {
      return {
        code: 400,
        message: 'Error',
        error: error.message,
      };
    }
  }

  @Post('raiseBadgeRequest')
  raiseBadgeRequest(@Body() body: RaiseBadgeRequestDto) {
    const { requesterPublicKey, badgeType } = body;
    return this.guildsService.raiseBadgeRequest(requesterPublicKey, badgeType);
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
