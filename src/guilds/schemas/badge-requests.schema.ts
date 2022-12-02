import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BadgeRequestsDocument = HydratedDocument<BadgeRequests>;

@Schema({ timestamps: true, versionKey: false })
export class BadgeRequests {
  @Prop()
  requesterId: string;

  @Prop()
  requesterPublicKey: string;

  @Prop()
  lenderId: string;

  @Prop()
  lenderPublicKey: string;

  @Prop()
  badgeType: string;

  @Prop()
  mintAddress: string;

  @Prop()
  allotmentDate: Date;

  @Prop()
  revokeDate: Date;

  @Prop()
  revokeReason: string;

  @Prop()
  signature: string;

  @Prop()
  status: string;
}

export const BadgeRequestsSchema = SchemaFactory.createForClass(BadgeRequests);
