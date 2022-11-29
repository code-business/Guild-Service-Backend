import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  createAssociatedTokenAccountInstruction,
  createTransferCheckedInstruction,
  getAssociatedTokenAddress,
} from '@solana/spl-token';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
} from '@solana/web3.js';
import { Model } from 'mongoose';
import { BuyBadgeDto } from './dto/buy-badge.dto';
import { RaiseBadgeRequestDto } from './dto/raise-badge-request.dto';
import { RentBadgeDto } from './dto/rent-badge.dto';
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
  private connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  private GARI_WALLET_SECRET_KEY = new Uint8Array(
    process.env.GARI_PRIVATE_KEY.split(',').map((e) => parseInt(e)),
  );

  constructor(
    @InjectModel(BadgeRequests.name)
    private badgeRequestsModel: Model<BadgeRequestsDocument>,
    @InjectModel(BadgeHistory.name)
    private badgeHistoryModel: Model<BadgeHistoryDocument>,
    private readonly httpService: HttpService,
  ) {}

  async buyBadge(body: BuyBadgeDto) {
    const { userId, publicKey, badgeType } = body;
    const history = await this.badgeHistoryModel.findOne(
      { userId, publicKey, badgeType, status: 'draft' },
      'mint',
    );
    let response: any;
    if (history) {
      response = await this.httpService.axiosRef.post(
        `${process.env.NFT_SERVICE_URL}/nft/update`,
        {
          usdToGari: 1,
          mint: history.mint,
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
      await this.badgeHistoryModel.create({
        userId,
        publicKey,
        badgeType,
        mint,
        status: 'draft',
      });
      return encodedTransaction;
    }
  }

  updateBadgeHistory(body: UpdateBadgeHistoryDto) {
    const { userId, publicKey, badgeType, signature } = body;
    return this.badgeHistoryModel.findOneAndUpdate(
      { userId, publicKey, badgeType, status: 'draft' },
      { signature, status: 'pending' },
      { new: true },
    );
  }

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

  async getBadges(publicKey: string) {
    return this.badgeHistoryModel.find({ publicKey }).lean();
  }

  async rentBadge(body: RentBadgeDto) {
    const { lenderPublicKey, borrowerPublicKey, mint } = body;
    const tokenAccountXPubkey = await getAssociatedTokenAddress(
      new PublicKey(mint),
      new PublicKey(lenderPublicKey),
    );

    const tokenAccountYPubkey = await getAssociatedTokenAddress(
      new PublicKey(mint),
      new PublicKey(borrowerPublicKey),
    );

    const tx = new Transaction();

    const blockhashObj = await this.connection.getRecentBlockhash();
    tx.recentBlockhash = blockhashObj.blockhash;
    tx.feePayer = new PublicKey(lenderPublicKey);

    tx.add(
      createAssociatedTokenAccountInstruction(
        new PublicKey(lenderPublicKey),
        tokenAccountYPubkey,
        new PublicKey(borrowerPublicKey),
        new PublicKey(mint),
      ),
    );

    tx.add(
      createTransferCheckedInstruction(
        tokenAccountXPubkey, // from (should be a token account)
        new PublicKey(mint), // mint
        tokenAccountYPubkey, // to (should be a token account)
        new PublicKey(lenderPublicKey), // from's owner
        1, // amount, if your deciamls is 8, send 10^8 for 1 token
        0,
      ),
    );
    return tx
      .serialize({
        requireAllSignatures: false,
      })
      .toString('base64');
  }
}
