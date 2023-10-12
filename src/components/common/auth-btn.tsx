'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { GitHubIcon } from './icons'

const AuthBtn = () => {
  const supabase = createClientComponentClient()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback' // cuando el user inicie sesion, obtendremos las credenciales de usuario y deben ser almacenadas en la cookie. Mediante un metodo esta informacion sera guardada en la cookie
      }
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <header>
      <button onClick={handleSignIn} type="button" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
        <GitHubIcon />
        Sign in with Github
      </button>
      <button onClick={handleSignOut}>Sign Out!</button>
    </header>
  )
}

export default AuthBtn
