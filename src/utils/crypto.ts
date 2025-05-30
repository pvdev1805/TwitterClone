import { createHash } from 'crypto'
import { config } from 'dotenv'

config()

export const sha256 = (content: string) => {
  return createHash('sha256').update(content).digest('hex')
}

export const hashPassword = (password: string) => {
  return sha256(password + process.env.PASSWORD_SECRET)
}
