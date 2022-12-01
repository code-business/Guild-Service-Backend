import { Metaplex } from '@metaplex-foundation/js';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  clusterApiUrl,
  Connection,
  Transaction,
  PublicKey,
} from '@solana/web3.js';
import { Model } from 'mongoose';
import { BuyBadgeDto } from './dto/buy-badge.dto';
import { UpdateBadgeRecordDto } from './dto/update-badge-record.dto';
import {
  BadgeRecords,
  BadgeRecordsDocument,
} from './schemas/badge-records.schema';
import {
  BadgeRequests,
  BadgeRequestsDocument,
} from './schemas/badge-requests.schema';

@Injectable()
export class GuildsService {
  private connection = new Connection(clusterApiUrl('devnet'));
  private metaplex = new Metaplex(this.connection);

  constructor(
    @InjectModel(BadgeRecords.name)
    private badgeRecordsModel: Model<BadgeRecordsDocument>,
    @InjectModel(BadgeRequests.name)
    private badgeRequestsModel: Model<BadgeRequestsDocument>,
    private readonly httpService: HttpService,
  ) {}

  async getBadges(publicKey: string) {
    const records = await this.badgeRecordsModel.find({
      publicKey,
      status: { $in: ['pending', 'success'] },
    });
    if (!records.length) {
      const myNfts = await this.metaplex.nfts().findAllByOwner({
        owner: new PublicKey(publicKey),
      });
      myNfts.forEach(async ({ name, symbol, mintAddress }: any) => {
        if (symbol === 'GARI') {
          await this.badgeRecordsModel.updateOne(
            { publicKey, mint: mintAddress },
            {
              publicKey,
              badgeType: name === 'Petite Pyro' ? 'Creator' : 'User',
              mint: mintAddress,
              status: 'success',
            },
            { upsert: true },
          );
        }
      });
      return await this.badgeRecordsModel.find({
        publicKey,
        status: { $in: ['pending', 'success'] },
      });
    } else return records;
  }

  async buyBadge(body: BuyBadgeDto) {
    const { publicKey, badgeType } = body;
    const record = await this.badgeRecordsModel.findOne(
      { publicKey, badgeType, status: 'draft' },
      'mint',
    );
    let response: any;
    if (record) {
      response = await this.httpService.axiosRef.post(
        `${process.env.NFT_SERVICE_URL}/nft/update`,
        {
          usdToGari: 1,
          mint: record.mint,
          userPublicKey: publicKey,
          badge: `Basic${badgeType}Badge`,
          type: badgeType,
        },
      );
      return response.data.transaction;
    } else {
      response = await this.httpService.axiosRef.post(
        `${process.env.NFT_SERVICE_URL}/nft/create`,
        {
          feePayer: publicKey,
          usdToGari: 1,
          userPublicKey: publicKey,
          badge: `Basic${badgeType}Badge`,
          type: badgeType,
        },
      );
      const encodedTransaction = response.data.transaction;
      const buffer = Buffer.from(encodedTransaction, 'base64');
      const decodedTransaction = Transaction.from(buffer);
      const mint = decodedTransaction.signatures[1].publicKey;
      await this.badgeRecordsModel.create({
        publicKey,
        badgeType,
        mint,
        status: 'draft',
      });
      return encodedTransaction;
    }
  }

  updateBadgeRecord(body: UpdateBadgeRecordDto) {
    const { publicKey, badgeType, signature } = body;
    return this.badgeRecordsModel.findOneAndUpdate(
      { publicKey, badgeType, status: 'draft' },
      { signature, status: 'pending' },
      { new: true },
    );
  }

  raiseBadgeRequest(body: any) {
    return this.badgeRequestsModel.create({ ...body, status: 'pending' });
  }

  cancelBadgeRequest(requestId: string) {
    return this.badgeRequestsModel.findByIdAndUpdate(
      requestId,
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
}
