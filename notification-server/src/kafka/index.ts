import { randomUUID } from 'crypto'
import { Kafka } from 'kafkajs'
import { prisma } from '../prisma'

if (!process.env.BROKER) throw new Error('Kafka broker is needed')

const kafka = new Kafka({
  clientId: process.env.KAFKACLIENTID ?? 'test',
  brokers: [process.env.BROKER ?? 'localhost:9092'],
  ...(process.env.KAFKAUSERNAME && {
    sasl: {
      mechanism: 'scram-sha-256',
      username: process.env.KAFKAUSERNAME ?? '',
      password: process.env.KAFKAPASSWORD ?? ''
    }
  })
})

export const kafkaConsumer = kafka.consumer({ groupId: 'test' })
kafkaConsumer.connect().then(() => console.log('[Notification-Server] - Consumer connected'))
kafkaConsumer.subscribe({ topic: 'new-account', fromBeginning: true });

(async () => {
  await kafkaConsumer.run({
    eachMessage: async ({ message, topic }) => {
      if (!message.value) return
      const parsedMessage = JSON.parse(message.value.toString())
      switch (topic) {
        case 'new-account':
          console.log(`[Notification-Server] Mandando notificação para o novo usuário: ${parsedMessage.email}`)
          await prisma.account.create({ data: { id: randomUUID(), ...parsedMessage } })
          break;
      }
    }
  })
})()