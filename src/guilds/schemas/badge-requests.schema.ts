import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BadgeRequestsDocument = HydratedDocument<BadgeRequests>;

@Schema({ timestamps: true, versionKey: false })
export class BadgeRequests {
  @Prop({ required: true })
  requesterDetails: string;

  @Prop({ required: true })
  requesterUserId: string;

  @Prop({ required: true })
  requesterPublicKey: string;

  @Prop({ required: true })
  lenderUserId: string;

  @Prop({ required: true })
  lenderPublicKey: string;

  @Prop({ required: true })
  badgePublicKey: string;

  @Prop({ required: true })
  badgeType: string;

  @Prop({ required: true })
  allotmentDate: string;

  @Prop({ required: true })
  revokeDate: string;

  @Prop({ required: true })
  revokeReason: string;

  @Prop({ required: true })
  lenderborrowerType: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  requestedOn: string;
}

export const BadgeRequestsSchema = SchemaFactory.createForClass(BadgeRequests);
