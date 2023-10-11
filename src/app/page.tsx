import AuthBtn from '@/components/common/auth-btn'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const Home = async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data: posts } = await supabase.from('posts').select('*')

  return (
    <>
      <div className='flex min-h-screen flex-col items-center justify-center p-24'>
        <h1>Welcome To X clone!</h1>
        <AuthBtn />
        <main className=''>
          {
            JSON.stringify(posts, null, 2)
          }
        </main>
      </div>
    </>
  )
}

export default Home
