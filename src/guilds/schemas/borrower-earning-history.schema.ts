import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BorrowerEarningHistoryDocument =
  HydratedDocument<BorrowerEarningHistory>;

@Schema({ timestamps: true, versionKey: false })
export class BorrowerEarningHistory {
  @Prop({ required: true })
  borrowerId: string;

  @Prop({ required: true })
  lenderId: string;

  @Prop({ required: true })
  lenderSplit: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  creatorSideEarning: string;

  @Prop({ required: true })
  borrowerSideEarning: string;
}

export const BorrowerEarningHistorySchema = SchemaFactory.createForClass(
  BorrowerEarningHistory,
);
