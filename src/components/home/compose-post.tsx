import React from 'react'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export function ComposePost ({
  userAvatarUrl
}: {
  userAvatarUrl: string
}) {
  const addPost = async (formData: FormData) => {
    'use server'

    const content = formData.get('content')

    if (content === null) return

    const supabase = createServerActionClient({ cookies })

    // revisar si el usuario realmente esta autentificado
    const { data: { user } } = await supabase.auth.getUser()
    if (user === null) return

    await supabase
      .from('posts')
      .insert({ content, user_id: user.id })

    // al indicar el path que queremos revalidar, deberia volver a preguntar por la informacion. Entonces al revalidar la ruta, va a volver a hacer toda la peticion de los servers components y los fetchs automaticamente para renderizar correctamente la info.
    revalidatePath('/')
  }
  return (
    <form
      action={addPost}
      className='flex flex-row p-4 border-b border-white/20'>
      <img
        className='rounded-full w-10 h-10 mr-4'
        alt='avatar image'
        src={userAvatarUrl}
      />
      <div className='flex flex-1 flex-col gap-y-4'>
        <textarea
          name="content"
          rows={4}
          className='w-full text-xl bg-black placeholder-gray-500 p-2 resize-none border-none outline-none'
          placeholder='¿Que esta pasando?'
        ></textarea>
        <button
          type='submit'
          className='bg-sky-500 text-sm font-bold rounded-full px-5 py-2 self-end'>
          Postear
        </button>
      </div>
    </form>
  )
}
