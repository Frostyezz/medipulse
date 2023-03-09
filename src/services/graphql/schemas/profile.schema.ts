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
import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";
import { ROLES } from "../types/enums";

registerEnumType(ROLES, {
  name: "ROLES",
});

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

  @Field(() => String, { nullable: true })
  @prop()
  medicId: string;

  @Field(() => ROLES)
  @prop({ type: String, enum: ROLES, required: true, default: ROLES.MEDIC })
  role: ROLES;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  @Field(() => Number, { nullable: true })
  @prop()
  latitude?: number;

  @Field(() => Number, { nullable: true })
  @prop()
  longitude?: number;
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

  @Field(() => Number, { nullable: true })
  latitude?: number;

  @Field(() => Number, { nullable: true })
  longitude?: number;
}
