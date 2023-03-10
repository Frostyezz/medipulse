import {
  getModelForClass,
  ModelOptions,
  prop,
  Severity,
} from "@typegoose/typegoose";
import { IsString } from "class-validator";
import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";
import { REQUEST_STATUS } from "../types/enums";
import { Profile } from "./profile.schema";

registerEnumType(REQUEST_STATUS, {
  name: "REQUEST_STATUS",
});

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

@ObjectType()
export class GetTransfersRequestsResult {
  @Field(() => TransferRequest)
  request: TransferRequest;

  @Field(() => Profile)
  patientProfile: Profile;

  @Field(() => Profile)
  medicProfile: Profile;
}

@InputType()
export class ProcessTransferRequestInput {
  @IsString()
  @Field(() => String)
  transferId: String;

  @Field(() => REQUEST_STATUS)
  status: REQUEST_STATUS;
}
