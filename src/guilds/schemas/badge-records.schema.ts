import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BadgeRecordsDocument = HydratedDocument<BadgeRecords>;

@Schema({ timestamps: true, versionKey: false })
export class BadgeRecords {
  @Prop()
  publicKey: string;

  @Prop()
  badgeType: string;

  @Prop()
  mintAddress: string;

  @Prop()
  status: string;

  @Prop()
  signature: string;
}

export const BadgeRecordsSchema = SchemaFactory.createForClass(BadgeRecords);
