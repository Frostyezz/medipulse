import {
  getModelForClass,
  ModelOptions,
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
export class TransferRequest {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  @prop({ required: true })
  medicId: String;

  @Field(() => String)
  @prop({ required: true })
  transferTo: String;

  @Field(() => String)
  @prop({ required: true })
  patientId: String;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

const TransferRequestModel =
  getModelForClass<typeof TransferRequest>(TransferRequest);
export default TransferRequestModel;

@InputType()
export class CreateTransferRequestInput {
  @IsString()
  @Field(() => String)
  transferTo: String;
}
