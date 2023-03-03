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
  this: ReturnModelType<typeof Medic, QueryHelpers>,
  contextId: Medic["contextId"]
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
export class Medic {
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

  @prop({ required: true })
  medicalProof: string;
}

const MedicModel = getModelForClass<typeof Medic, QueryHelpers>(Medic);
export default MedicModel;

@InputType()
export class CreateMedicInput {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  avatar?: string;

  @IsString()
  @Field(() => String)
  medicalProof: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;
}
