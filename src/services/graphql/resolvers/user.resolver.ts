import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CreateUserInput, LoginInput, User } from "../schemas/user.schema";
import UserService from "../service/user.service";
import type { Context } from "../types/context";

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => User)
  createUser(@Arg("input") input: CreateUserInput, @Ctx() context: Context) {
    return this.userService.createUser(input);
  }

  @Mutation(() => String)
  login(@Arg("input") input: LoginInput, @Ctx() context: Context) {
    return this.userService.login(input, context);
  }

  @Query(() => User)
  me(@Ctx() context: Context) {
    return context.user;
  }
}
