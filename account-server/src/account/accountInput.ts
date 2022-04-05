import { IsEmail, MinLength } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export default class UserCreateInput {
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
  @Field()
  name: string

  @IsEmail(undefined, { message: 'Email inválido.' })
  @Field()
  email: string

  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  @Field()
  password: string

  @Field(() => Int, { defaultValue: 1, description: 'Representação do nivel de conta do usuário' })
  accountLevel: number
}