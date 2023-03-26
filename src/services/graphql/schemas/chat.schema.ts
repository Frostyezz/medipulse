import {
  getModelForClass,
  ModelOptions,
  Passthrough,
  prop,
  Severity,
} from "@typegoose/typegoose";
import { IsString } from "class-validator";
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

  @Field(() => [Message], { nullable: true })
  @prop({
    required: false,
    default: [],
    type: () =>
      new Passthrough(
        {
          sender: String,
          receiver: String,
          content: String,
          sentAt: String,
        },
        true
      ),
  })
  messages?: Message[];

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

@ObjectType()
export class Message {
  @Field(() => String)
  @prop({ required: true })
  sender: String;

  @Field(() => String)
  @prop({ required: true })
  receiver: String;

  @Field(() => String)
  @prop({ required: true })
  content: String;

  @Field(() => String)
  @prop({ required: true })
  sentAt: String;
}

const ChatModel = getModelForClass<typeof Chat>(Chat);
export default ChatModel;

@InputType()
export class CreateChatInput {
  @Field(() => String, { nullable: true })
  medicId?: String;

  @Field(() => String, { nullable: true })
  patientId?: String;

  @Field(() => String, { nullable: true })
  nurseId?: String;
}

@InputType()
export class GetChatInput {
  @Field(() => String, { nullable: true })
  medicId?: String;

  @Field(() => String, { nullable: true })
  patientId?: String;

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
}
