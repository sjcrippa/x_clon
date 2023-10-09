import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const Home = async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data: posts } = await supabase.from('posts').select('*')

  return (
    <>
      <div className='container w-full text-center'>
        <h1>Welcome To X clone!</h1>
        <pre>
          {
            JSON.stringify(posts, null, 2)
          }
        </pre>
      </div>
    </>
  )
}

export default Home
