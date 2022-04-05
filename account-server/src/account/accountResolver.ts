import { Account } from '@prisma/client';
import { randomUUID } from 'crypto';
import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { prisma } from '../main/prismaClient';
import UserCreateInput from './accountInput';
import AccountSchema from './accountSchema';

@Resolver()
export default class UserResolver {
  @Query(() => [AccountSchema])
  async users(
    @Arg('accountLevel', () => Int, { nullable: true }) accountLevel: number,
    @Arg('email', { nullable: true }) email: string
  ): Promise<Account[]> {
    const accounts = await prisma.account.findMany({ where: { accountLevel, email } })
    return accounts
  }

  @Mutation(() => AccountSchema)
  async createUser(
    @Arg('fields') fields: UserCreateInput,
  ): Promise<Account> {
    const newAccount = { id: randomUUID(), ...fields }
    await prisma.account.create({ data: newAccount })
    return newAccount
  }
}