import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BadgeHistoryDocument = HydratedDocument<BadgeHistory>;

@Schema({ timestamps: true, versionKey: false })
export class BadgeHistory {
  @Prop()
  userId: string;

  @Prop()
  publicKey: string;

  @Prop()
  badgeType: string;

  @Prop()
  mint: string;

  @Prop()
  signature: string;

  @Prop()
  status: string;
}

export const BadgeHistorySchema = SchemaFactory.createForClass(BadgeHistory);
