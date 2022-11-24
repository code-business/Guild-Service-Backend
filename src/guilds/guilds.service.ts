import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BuyBadgeDto } from './dto/buy-badge.dto';
import { CreateBadgeTransactionDto } from './dto/create-badge-transaction.dto';
import { RaiseBadgeRequestDto } from './dto/raise-badge-request.dto';
import { UpdateBadgeHistoryDto } from './dto/update-badge-history.dto';
import {
  BadgeHistory,
  BadgeHistoryDocument,
} from './schemas/badge-history.schema';
import {
  BadgeRequests,
  BadgeRequestsDocument,
} from './schemas/badge-requests.schema';

@Injectable()
export class GuildsService {
  constructor(
    @InjectModel(BadgeRequests.name)
    private badgeRequestsModel: Model<BadgeRequestsDocument>,
    @InjectModel(BadgeHistory.name)
    private badgeHistoryModel: Model<BadgeHistoryDocument>,
    private readonly httpService: HttpService,
  ) {}

  raiseBadgeRequest(body: RaiseBadgeRequestDto) {
    return this.badgeRequestsModel.create(body);
  }

  cancelBadgeRequest(id: string) {
    return this.badgeRequestsModel.findByIdAndUpdate(
      id,
      { status: 'cancelled' },
      { new: true },
    );
  }

  getMinerInfo(userIds: any) {
    return userIds.map(() => ({
      name: 'Navnath Parte',
      joinDate: '12 Jan, 2022',
      totalVideosUploaded: 10,
      followers: 100,
      following: 1000,
      contributionScore: 67,
      gariEarnedViaMining: 2400,
    }));
  }

  getLiveBadgeRequests() {
    return this.badgeRequestsModel.find({ status: 'pending' }).lean();
  }

  async buyBadge(body: BuyBadgeDto) {
    const { publicKey, badgeType } = body;
    const badgeHistory = await this.badgeHistoryModel.create(body);
    const response = await this.httpService.axiosRef.post(
      `${process.env.NFT_SERVICE_URL}/nft/create`,
      {
        usdToGari: '100',
        userPublicKey: publicKey,
        badge: `Basic${badgeType}Badge`,
        type: badgeType,
        feePayer: publicKey,
      },
    );
    return { id: badgeHistory._id, ...response.data };
  }

  updateBadgeHistory(body: UpdateBadgeHistoryDto) {
    const { id, mint, signature, status } = body;
    return this.badgeHistoryModel.findByIdAndUpdate(
      id,
      { mint, signature, status },
      { new: true },
    );
  }

  /* async getTokens() {
    const tokens = await this.badgeHistoryModel
      .find({ status: 'success' })
      .exec();
    const metadata = tokens.map(async (token) => {
      const url = await this.httpService.axiosRef.get(
        `https://dev-nft-badge.chingari.io/api/nft/getMetaData?mint=${token.mint}`,
      );
      const response = await this.httpService.axiosRef.get(url.data);
      return token;
    });
    return await Promise.all(metadata);
  }

  async createBadgeTransaction(
    createBadgeTransactionDto: CreateBadgeTransactionDto,
  ) {
    const filter = { _id: createBadgeTransactionDto.requestId };
    const update = {
      lenderId: createBadgeTransactionDto.lenderId,
      lenderPublicKey: createBadgeTransactionDto.lenderPublicKey,
      badgePublicKey: createBadgeTransactionDto.badgePublicKey,
      allotmentDate: createBadgeTransactionDto.allotmentDate,
      status: 'rented',
    };
    return await this.badgeRequestsModel.findOneAndUpdate(filter, update, {
      new: true,
    });
  } */
}
