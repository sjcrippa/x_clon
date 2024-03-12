'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const addPost = async (formData: FormData) => {
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
