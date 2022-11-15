import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BadgeRequestsDocument = HydratedDocument<BadgeRequests>;

@Schema({ timestamps: true, versionKey: false })
export class BadgeRequests {
  @Prop()
  borrowername: string;

  @Prop()
  profilePic: string;

  @Prop()
  joinDate: string;

  @Prop()
  totalVideosUploaded: string;

  @Prop()
  followers: string;

  @Prop()
  following: string;

  @Prop()
  requesterPublicKey: string;

  @Prop()
  lenderPublicKey: string;

  @Prop()
  badgePublicKey: string;

  @Prop()
  badgeType: string;

  @Prop()
  allotmentDate: string;

  @Prop()
  revokeDate: string;

  @Prop()
  revokeReason: string;

  @Prop()
  walletType: string;

  @Prop()
  status: string;
}

export const BadgeRequestsSchema = SchemaFactory.createForClass(BadgeRequests);
