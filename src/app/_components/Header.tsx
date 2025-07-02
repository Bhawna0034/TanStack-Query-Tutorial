import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='flex items-center justify-between mb-8'>
     <h2>TanStack Query</h2>
     <div className='flex items-center gap-4 justify-between'>
        <Link href="/">HOME</Link>
        <Link href="/fetchold">FETCHOLD</Link>
        <Link href="/rq">FETCHRQ</Link>
     </div>

    </header>
  )
}

export default Header