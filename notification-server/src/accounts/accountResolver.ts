import { Arg, Mutation, Query, registerEnumType, Resolver } from 'type-graphql';
import { prisma } from '../prisma';
import AccountSchema from './accountSchema';

@Resolver(() => AccountSchema)
export default class AccountResolver {
  formatAccountLevel = (accountLevel: AccountLevel) => accountLevel === 0 ? undefined : accountLevel

  @Query(() => [AccountSchema])
  async accounts(
    @Arg('accountLevel', () => AccountLevel, { nullable: true }) accountLevel: AccountLevel,
    @Arg('email', { nullable: true }) email: string,
    @Arg('name', { nullable: true }) name: string,
  ): Promise<AccountSchema[]> {
    const users = await prisma.account.findMany({
      where: {
        accountLevel: this.formatAccountLevel(accountLevel),
        email,
        name: { contains: name }
      }
    })
    return users
  }

  @Mutation(() => String)
  async sendNotification(
    @Arg('accountLevel', () => AccountLevel) accountLevel: AccountLevel
  ) {
    const qtdUser = await prisma.account.count({
      where: {
        accountLevel: this.formatAccountLevel(accountLevel)
      }
    })
    return `Notificação enviada para o total de ${qtdUser} usuários`
  }
}

enum AccountLevel {
  one = 1,
  two = 2,
  three = 3,
  all = 0
}

registerEnumType(AccountLevel, {
  name: 'AccountLevelEnum',
})