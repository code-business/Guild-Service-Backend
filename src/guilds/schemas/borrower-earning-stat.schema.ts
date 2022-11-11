import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BorrowerEarningStatDocument = HydratedDocument<BorrowerEarningStat>;

@Schema({ timestamps: true, versionKey: false })
export class BorrowerEarningStat {
  @Prop({ required: true })
  borrowerId: string;

  @Prop({ required: true })
  borrowerDaily: string;

  @Prop({ required: true })
  borrowerWeekly: string;

  @Prop({ required: true })
  borrowerMonthly: string;

  @Prop({ required: true })
  creatorDaily: string;

  @Prop({ required: true })
  creatorWeekly: string;

  @Prop({ required: true })
  creatorMonthly: string;
}

export const BorrowerEarningStatSchema =
  SchemaFactory.createForClass(BorrowerEarningStat);
