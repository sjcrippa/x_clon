import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export const dynamic = 'force-dynamic' // opcion de next.js para evitar que cachee de forma estatica la ruta, y que siempre se ejecute en el servidor

// de esta manera estamos creando un endpoint dentro del proyecto:
export async function GET (request: NextRequest) {
  const requestUrl = new URL(request.url) // accede al query string sin nada raro.
  const code = requestUrl.searchParams.get('code')

  if (code !== null) {
    const supabase = createRouteHandlerClient({ cookies })
    // las cookies del lado del servidor son mas seguras que el storage
    // usando el codigo que le hemos pasado por URL, nos devuelve la sesion del usuario.
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(requestUrl.origin) // tambien puede ser ('/') para que siempre devuelva al home, pero requestUrl.origin es lo mas correcto.
}
