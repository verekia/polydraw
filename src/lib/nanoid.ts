import { customAlphabet } from 'nanoid'

const numbers = '1234567890'
const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const nanoid = customAlphabet(`${numbers}${lowercaseLetters}${uppercaseLetters}`, 5)

export const createId = () => nanoid()
