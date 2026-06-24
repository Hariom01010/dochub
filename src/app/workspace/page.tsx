import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
  const cookieStore = await cookies();
  const token = cookieStore.get('dochub');

  if(!token) {
    redirect('/login')
  }
  return (
    <div>
      This is dashboard
    </div>
  )
}
