import {
  getModelForClass,
  ModelOptions,
  prop,
  Severity,
} from "@typegoose/typegoose";
import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";
import {
  APPOINTMENT_IMPORTANCE,
  APPOINTMENT_STATUS,
} from "@/services/graphql/types/enums";
import { IsOptional, IsString } from "class-validator";

registerEnumType(APPOINTMENT_IMPORTANCE, {
  name: "APPOINTMENT_IMPORTANCE",
});

registerEnumType(APPOINTMENT_STATUS, {
  name: "APPOINTMENT_STATUS",
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
export class Appointment {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  @prop({ required: true })
  medicId: String;

  @Field(() => String, { nullable: true })
  @prop({ required: false })
  patientId?: String;

  @Field(() => String, { nullable: true })
  @prop({ required: false })
  patientName?: String;

  @Field(() => String)
  @prop({ required: true })
  title: String;

  @Field(() => APPOINTMENT_STATUS)
  @prop({
    type: String,
    enum: APPOINTMENT_STATUS,
    required: true,
    default: APPOINTMENT_STATUS.PENDING,
  })
  status: APPOINTMENT_STATUS;

  @Field(() => APPOINTMENT_IMPORTANCE)
  @prop({
    type: String,
    enum: APPOINTMENT_IMPORTANCE,
    required: true,
    default: APPOINTMENT_IMPORTANCE.NORMAL,
  })
  importance: APPOINTMENT_IMPORTANCE;

  @Field(() => String)
  @prop({ required: true })
  start: string;

  @Field(() => String)
  @prop({ required: true })
  end: string;

  @Field(() => [String], { nullable: true })
  @prop({ required: false })
  notes: string[];

  @Field(() => [String], { nullable: true })
  @prop({ required: false })
  files: string[];

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

const AppointmentModel = getModelForClass<typeof Appointment>(Appointment);
export default AppointmentModel;

@InputType()
export class CreateAppointmentInput {
  @Field(() => String)
  medicId: String;

  @IsOptional()
  @Field(() => String, { nullable: true })
  patientId?: String;

  @IsOptional()
  @Field(() => String, { nullable: true })
  patientName?: String;

  @Field(() => String)
  title?: String;

  @Field(() => String)
  start: string;

  @Field(() => String)
  end: string;

  @Field(() => APPOINTMENT_IMPORTANCE)
  importance: APPOINTMENT_IMPORTANCE;

  @Field(() => APPOINTMENT_STATUS)
  status: APPOINTMENT_STATUS;
}

@InputType()
export class UpdateAppointmentInput {
  @Field(() => String)
  id: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  title?: String;

  @IsOptional()
  @Field(() => String, { nullable: true })
  start?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  end?: string;

  @IsOptional()
  @Field(() => APPOINTMENT_IMPORTANCE, { nullable: true })
  importance?: APPOINTMENT_IMPORTANCE;

  @IsOptional()
  @Field(() => APPOINTMENT_STATUS, { nullable: true })
  status?: APPOINTMENT_STATUS;

  @IsOptional()
  @Field(() => [String], { nullable: true })
  notes?: string[];

  @IsOptional()
  @Field(() => [String], { nullable: true })
  files?: string[];
}

@InputType()
export class DeleteAppoitmentById {
  @IsString()
  @Field(() => String)
  _id: string;
}
