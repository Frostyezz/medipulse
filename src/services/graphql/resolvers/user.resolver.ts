import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  CreateUserInput,
  LoginInput,
  User,
  VerifyEmailInput,
} from "../schemas/user.schema";
import UserService from "../service/user.service";
import type { Context } from "../types/context";

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => User)
  createUser(@Arg("input") input: CreateUserInput, @Ctx() context: Context) {
    return this.userService.createUser(input, context);
  }

  @Mutation(() => String)
  login(@Arg("input") input: LoginInput, @Ctx() context: Context) {
    return this.userService.login(input, context);
  }

  @Mutation(() => Boolean, { nullable: true })
  resendValidationCode(@Ctx() context: Context) {
    return this.userService.resendValidationCode(context);
  }

  @Mutation(() => Boolean, { nullable: true })
  verifyEmail(@Arg("input") input: VerifyEmailInput, @Ctx() context: Context) {
    return this.userService.verifyEmail(input, context);
  }

  @Mutation(() => Boolean, { nullable: true })
  deleteUser(@Ctx() context: Context) {
    return this.userService.deleteUser(context);
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() context: Context) {
    return this.userService.getUser(context);
  }
}
