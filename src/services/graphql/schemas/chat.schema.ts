import {
  getModelForClass,
  ModelOptions,
  Passthrough,
  prop,
  Severity,
} from "@typegoose/typegoose";
import { IsOptional, IsString } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@ObjectType()
export class Chat {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String, { nullable: true })
  @prop({ required: false })
  medicId?: String;

  @Field(() => String, { nullable: true })
  @prop({ required: false })
  patientId?: String;

  @Field(() => String, { nullable: true })
  @prop({ required: false })
  nurseId?: String;

  @IsOptional()
  @Field(() => [Message], { nullable: true })
  @prop({
    required: false,
    default: [],
  })
  messages?: Message[];

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

@ObjectType()
export class Message {
  @IsOptional()
  @Field(() => String)
  @prop({ required: true })
  sender: String;

  @IsOptional()
  @Field(() => String)
  @prop({ required: true })
  receiver: String;

  @IsOptional()
  @Field(() => String)
  @prop({ required: true })
  content: String;

  @IsOptional()
  @Field(() => String)
  @prop({ required: true })
  sentAt: String;
}

const ChatModel = getModelForClass<typeof Chat>(Chat);
export default ChatModel;

@InputType()
export class CreateChatInput {
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  medicId?: String;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  patientId?: String;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  nurseId?: String;
}

@InputType()
export class GetChatInput {
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  medicId?: String;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  patientId?: String;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  nurseId?: String;
}

@InputType()
export class SendMessageInput {
  @IsString()
  @Field(() => String)
  chatId: String;

  @IsString()
  @Field(() => String)
  content: String;

  @IsString()
  @Field(() => String)
  sender: String;

  @IsString()
  @Field(() => String)
  receiver: String;
}
