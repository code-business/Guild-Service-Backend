import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBadgeRequestDto } from './dto/create-badge-request.dto';
import {
  BadgeRequests,
  BadgeRequestsDocument,
} from './schemas/badge-requests.schema';

@Injectable()
export class GuildsService {
  constructor(
    @InjectModel(BadgeRequests.name)
    private badgeRequestsModel: Model<BadgeRequestsDocument>,
  ) {}

  createBadgeRequest(createBadgeRequestDto: CreateBadgeRequestDto) {
    const createdBadgeRequest = new this.badgeRequestsModel({
      ...createBadgeRequestDto,
      status: 'live',
    });
    return createdBadgeRequest.save();
  }

  getUserData(userIds) {
    return userIds.map(() => ({
      totalVideosUploaded: 10,
      followers: 100,
      following: 1000,
    }));
  }

  getUserStats(userIds) {
    return userIds.map(() => ({
      contributionScore: 67,
      gariEarnedViaMining: 2400,
    }));
  }

  getLiveBadgeRequests() {
    return this.badgeRequestsModel.find({ status: 'live' }).exec();
  }
}
