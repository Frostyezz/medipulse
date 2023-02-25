import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";
import {
  getModelForClass,
  index,
  ModelOptions,
  pre,
  prop,
  queryMethod,
  ReturnModelType,
  Severity,
} from "@typegoose/typegoose";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import bcrypt from "bcrypt";
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";

export enum ROLES {
  MEDIC = "MEDIC",
  NURSE = "NURSE",
  PATIENT = "PATIENT",
}

export enum LANGUAGES {
  EN = "en",
  RO = "ro",
}

registerEnumType(LANGUAGES, {
  name: "LANGUAGES",
});

registerEnumType(ROLES, {
  name: "ROLES",
});

interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>;
}

function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: User["email"]
) {
  return this.findOne({ email });
}

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@pre<User>("save", function () {
  if (!this.isModified("password")) return;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
})
@index({ email: 1 })
@queryMethod(findByEmail)
@ObjectType()
export class User {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  @prop({
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  })
  email: string;

  @prop({ required: true, trim: true })
  password: string;

  @Field(() => String)
  @prop({ trim: true })
  firstName: string;

  @Field(() => String)
  @prop({ trim: true })
  lastName: string;

  @Field(() => String, { nullable: true })
  @prop()
  avatar?: string;

  @Field(() => ROLES)
  @prop({ enum: ROLES, required: true })
  role: ROLES;

  @Field(() => LANGUAGES)
  @prop({ enum: LANGUAGES, required: true, default: "en" })
  languagePref: ROLES;

  @Field(() => Number)
  @prop({ required: true, default: 1 })
  registerStep: number;

  @Field(() => String)
  @prop()
  office: string;
}

const UserModel = getModelForClass<typeof User, QueryHelpers>(User);
export default UserModel;

@InputType()
export class CreateUserInput {
  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(6, {
    message: "Password must be at least 6 characters long",
  })
  @MaxLength(50, {
    message: "Password must not be longer than 50 characters",
  })
  @Field(() => String)
  password: string;

  @Field(() => ROLES)
  role: ROLES;
}

@InputType()
export class LoginInput {
  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(6, {
    message: "Password must be at least 6 characters long",
  })
  @MaxLength(50, {
    message: "Password must not be longer than 50 characters",
  })
  @Field(() => String)
  password: string;
}
