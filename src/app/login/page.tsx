import { AuthBtnServer } from '@/components/common/auth-btn-server'

export default function Login () {
  return (
    <section className='grid place-content-center min-h-screen'>
      <h1 className='text-xl font-bold mb-4'>Login into Santi&apos;s X Clone</h1>
      <AuthBtnServer />
    </section>
  )
}
