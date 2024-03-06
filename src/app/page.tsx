import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import AuthBtn from '@/components/common/auth-btn'

const Home = async () => {
  const supabase = createServerComponentClient({ cookies }) // como es un componente que esta del lado del servidor, podemos acceder a datos como las cookies. Y necesitamos las cookies para que supabase sepa si el user esta logeado y demas cosas.
  const { data: posts } = await supabase.from('posts').select('*')

  return (
    <>
      <div className='flex min-h-screen flex-col items-center justify-center p-24'>
        <h1>Welcome To X clone!</h1>
        <AuthBtn />
        <main>
          {
            JSON.stringify(posts, null, 2)
          }
        </main>
      </div>
    </>
  )
}

export default Home
