import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LenderInfoDocument = HydratedDocument<LenderInfo>;

@Schema({ timestamps: true, versionKey: false })
export class LenderInfo {
  @Prop({ required: true })
  pubkey: string;

  @Prop({ required: true })
  creatorBadgeCount: string;

  @Prop({ required: true })
  borrowerBadgeCount: string;

  @Prop({ required: true })
  createBadgeLent: string;

  @Prop({ required: true })
  borrowerBadgeLent: string;

  @Prop({ required: true })
  totalEarning: string;
}

export const LenderInfoSchema = SchemaFactory.createForClass(LenderInfo);
