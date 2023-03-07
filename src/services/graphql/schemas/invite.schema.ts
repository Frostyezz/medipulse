import {
  getModelForClass,
  index,
  ModelOptions,
  prop,
  queryMethod,
  Severity,
} from "@typegoose/typegoose";
import { AsQueryMethod, ReturnModelType } from "@typegoose/typegoose/lib/types";
import { IsEmail } from "class-validator";
import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";

import { LANGUAGES, ROLES } from "@/services/graphql/types/enums";

registerEnumType(LANGUAGES, {
  name: "LANGUAGES",
});

registerEnumType(ROLES, {
  name: "ROLES",
});

interface QueryHelpers {
  findByContextId: AsQueryMethod<typeof findByMedicId>;
}

function findByMedicId(
  this: ReturnModelType<typeof Invite, QueryHelpers>,
  medicId: Invite["medicId"]
) {
  return this.findOne({ medicId });
}

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index({ medicId: 1 })
@queryMethod(findByMedicId)
@ObjectType()
export class Invite {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  @prop({ required: true, unique: true })
  medicId: String;

  @IsEmail()
  @Field(() => String)
  @prop({ required: true, unique: true })
  email: string;

  @Field(() => ROLES)
  @prop({ type: String, enum: ROLES, required: true, default: ROLES.PATIENT })
  role: ROLES;

  @Field(() => LANGUAGES)
  @prop({
    type: String,
    enum: LANGUAGES,
    required: true,
    default: LANGUAGES.en,
  })
  language: LANGUAGES;
}

const InviteModel = getModelForClass<typeof Invite, QueryHelpers>(Invite);
export default InviteModel;

@InputType()
export class CreateInviteInput {
  @IsEmail()
  @Field(() => String)
  email: string;

  @Field(() => ROLES)
  role: ROLES;

  @Field(() => LANGUAGES)
  language: LANGUAGES;
}
