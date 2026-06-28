import React from 'react'
import jwt from 'jsonwebtoken'
import { UserToken } from '@/types/user'

export default function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET
  if(!secret) {
    throw new Error("Missing JWT Secret")
  }
  const data = jwt.verify(token, secret) as UserToken
  return data;
}
