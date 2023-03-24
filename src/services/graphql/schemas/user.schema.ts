import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from "type-graphql";
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
import {
  IsEmail,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";
import bcrypt from "bcrypt";
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";
import { LANGUAGES, ROLES, THEME } from "@/services/graphql/types/enums";

registerEnumType(LANGUAGES, {
  name: "LANGUAGES",
});

registerEnumType(ROLES, {
  name: "ROLES",
});

registerEnumType(THEME, {
  name: "THEME",
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
  const hash = bcrypt.hashSync(this.password.trim(), salt);
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

  @Field(() => String, { nullable: true })
  @prop()
  profileId: string;

  @Field(() => String, { nullable: true })
  @prop()
  medicId: string;

  @prop()
  validationCode?: number;

  @prop({ default: false })
  isEmailVerified: boolean;

  @Field(() => ROLES)
  @prop({ type: String, enum: ROLES, required: true, default: ROLES.MEDIC })
  role: ROLES;

  @Field(() => THEME, { nullable: true })
  @prop({ type: String, enum: THEME, required: true, default: THEME.light })
  theme: THEME;

  @Field(() => LANGUAGES)
  @prop({
    type: String,
    enum: LANGUAGES,
    required: true,
    default: LANGUAGES.en,
  })
  language: LANGUAGES;

  @Field(() => Int)
  @prop({ default: 1 })
  registerStep: number;
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

  @IsOptional()
  @Field(() => String, { nullable: true })
  medicId?: string;

  @Field(() => ROLES)
  role: ROLES;

  @Field(() => LANGUAGES)
  language: LANGUAGES;
}

@InputType()
export class VerifyEmailInput {
  @Min(1000)
  @Max(9999)
  @Field(() => Int)
  validationCode: number;
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
