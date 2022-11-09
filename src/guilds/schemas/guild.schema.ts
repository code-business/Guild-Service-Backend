/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GuildDocument = HydratedDocument<Guild>;

@Schema()
export class Guild {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    age: number;
}

export const GuildSchema = SchemaFactory.createForClass(Guild);