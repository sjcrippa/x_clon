import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { AuthBtnServer } from '@/components/common/auth-btn-server'
import { PostList } from '@/components/home/post-list'
import { type Database } from '@/types/database'
import { type Post } from '@/types/posts'

export default async function Home () {
  // como es un server-component, podemos acceder a datos como las cookies u las necesitamos para que supabase sepa si el user esta logeado, entre otras cosas.
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  // lo de abajo permite lo siguiente: si un usuario que no se encuentre logeado, intenta ir a la home, este sera dirigido obligatoriamiente al login para que se registre primero.
  if (session === null) {
    redirect('/login')
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('*, user:users(name, avatar_url, user_name)')

  return (
    <>
      <main className='flex min-h-screen flex-col items-center justify-center'>

        <section className='max-w-[600px] mx-auto border-l border-r border-white/30 min-h-screen'>
          <AuthBtnServer />
            <PostList posts={posts as Post[]} />
        </section>

      </main>
    </>
  )
}
