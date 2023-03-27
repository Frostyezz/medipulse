import {
  getModelForClass,
  index,
  ModelOptions,
  Passthrough,
  prop,
  queryMethod,
  Severity,
} from "@typegoose/typegoose";
import { AsQueryMethod, ReturnModelType } from "@typegoose/typegoose/lib/types";
import { IsOptional, IsString } from "class-validator";
import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";
import { LANGUAGES, ROLES, THEME } from "../types/enums";

registerEnumType(ROLES, {
  name: "ROLES",
});

registerEnumType(LANGUAGES, {
  name: "LANGUAGES",
});

registerEnumType(THEME, {
  name: "THEME",
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

  @Field(() => Number, { nullable: true })
  patientsCount?: number;

  @Field(() => [Schedule], { nullable: true })
  @prop({
    required: false,
    default: null,
    type: () =>
      new Passthrough(
        {
          startTime: String,
          endTime: String,
          daysOfWeek: [String],
          display: String,
          color: String,
        },
        true
      ),
  })
  schedule?: Schedule[];
}

const ProfileModel = getModelForClass<typeof Profile, QueryHelpers>(Profile);
export default ProfileModel;

@ObjectType()
export class Schedule {
  @Field(() => String)
  @prop({ required: true })
  startTime: string;

  @Field(() => String)
  @prop({ required: true })
  endTime: string;

  @Field(() => [String])
  @prop({ required: true })
  daysOfWeek: string[];

  @Field(() => String)
  @prop({ required: true, default: "background" })
  display: string;

  @Field(() => String)
  @prop({ required: true, default: "#228be6" })
  color: string;
}

@InputType()
class ScheduleInput {
  @Field(() => String)
  startTime: string;

  @Field(() => String)
  endTime: string;

  @Field(() => [String])
  daysOfWeek: string[];

  @Field(() => String)
  display: string;

  @Field(() => String)
  color: string;
}

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

@InputType()
export class GetDoctorsNearMeInput {
  @IsOptional()
  @Field(() => Number)
  latitude: number;

  @IsOptional()
  @Field(() => Number)
  longitude: number;

  @IsOptional()
  @Field(() => Number)
  maxDistance: number;
}

@InputType()
export class UpdateProfileInput {
  @IsOptional()
  @Field(() => [ScheduleInput], { nullable: true })
  schedule?: ScheduleInput[];

  @IsString()
  @Field(() => String)
  firstName: string;

  @IsString()
  @Field(() => String)
  lastName: string;

  @Field(() => LANGUAGES)
  language: LANGUAGES;

  @Field(() => THEME)
  theme: THEME;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  avatar?: string;
}

@InputType()
export class GetProfileByIdInput {
  @IsString()
  @Field(() => String)
  profileId: string;
}

@ObjectType()
export class GetStatsResult {
  @Field(() => Number, { nullable: true })
  patients: number;

  @Field(() => Number, { nullable: true })
  patientPercentage: number;

  @Field(() => Number, { nullable: true })
  appointments: number;

  @Field(() => Number, { nullable: true })
  appointmentPercentage: number;

  @Field(() => Number, { nullable: true })
  invites: number;

  @Field(() => Number, { nullable: true })
  invitePercentage: number;
}
