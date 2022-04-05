import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export default class Account {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  email: string

  @Field(() => Int)
  accountLevel: number
}