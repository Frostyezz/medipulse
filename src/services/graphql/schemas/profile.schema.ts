import {
  getModelForClass,
  index,
  ModelOptions,
  prop,
  queryMethod,
  Severity,
} from "@typegoose/typegoose";
import { AsQueryMethod, ReturnModelType } from "@typegoose/typegoose/lib/types";
import { IsOptional, IsString } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";

interface QueryHelpers {
  findByContextId: AsQueryMethod<typeof findByContextId>;
}

function findByContextId(
  this: ReturnModelType<typeof Profile, QueryHelpers>,
  contextId: Profile["contextId"]
) {
  return this.findOne({ contextId });
}

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index({ contextId: 1 })
@queryMethod(findByContextId)
@ObjectType()
export class Profile {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  @prop({ required: true, unique: true })
  contextId: String;

  @Field(() => String, { nullable: true })
  @prop()
  avatar?: string;

  @Field(() => String)
  @prop({ required: true, trim: true })
  firstName: string;

  @Field(() => String)
  @prop({ required: true, trim: true })
  lastName: string;

  @prop()
  medicalProof: string;
}

const ProfileModel = getModelForClass<typeof Profile, QueryHelpers>(Profile);
export default ProfileModel;

@InputType()
export class CreateProfileInput {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  avatar?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  medicalProof?: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;
}
