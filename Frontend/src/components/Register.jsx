import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async(event) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const userData = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })
      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to create your account.')
      }

      form.reset()
      navigate('/l', { replace: true, state: { registrationSuccess: true } })
    } catch (error) {
      setMessage(error instanceof TypeError
        ? 'Unable to connect to the server. Start the backend and check its database connection.'
        : error.message || 'Unable to create your account. Please try again.')
    }
  }

  return (
    <main className='flex min-h-screen items-center justify-center bg-[#f5efd0] p-4 sm:p-6'>
      <div className='w-full max-w-5xl overflow-hidden rounded-[28px] border border-[#d9d1a5] bg-white shadow-[0_20px_60px_rgba(17,39,31,0.15)]'>
        <div className='grid md:grid-cols-2'>
          <div
            className='relative hidden min-h-[680px] bg-cover bg-center md:block'
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80')",
            }}
          >
            <div className='absolute inset-0 bg-[#113b2f]/55' />
            <div className='relative z-10 flex h-full flex-col justify-between p-10 text-[#f9f3dc]'>
              <Link to='/h' className='text-sm font-medium uppercase tracking-[0.3em]'>
                Handcrafted Good Homes
              </Link>
              <div>
                <p className='mb-4 text-4xl font-semibold leading-tight'>Find pieces that feel like home.</p>
                <p className='max-w-xs text-sm leading-relaxed text-[#eef5ec]'>
                  Join us in making everyday spaces warmer, calmer, and a little more personal.
                </p>
              </div>
            </div>
          </div>

          <div className='flex items-center justify-center bg-[#f9f5e8] p-7 sm:p-10 md:p-12'>
            <div className='w-full max-w-md'>
              <div className='mb-7'>
                <Link to='/h' className='mb-6 inline-flex rounded-full border border-[#aab39a] px-4 py-2 text-sm font-semibold text-[#1d4d40] transition hover:bg-[#efecd9]'>
                  ← Back to home
                </Link>
                <div>
                <Link to='/h' className='text-xs font-semibold uppercase tracking-[0.3em] text-[#6d7858] hover:text-[#153c32]'>
                  Handcrafted Good Homes
                </Link>
                <h1 className='mt-4 text-4xl font-bold text-[#153c32]'>Create your account</h1>
                <p className='mt-2 text-sm text-[#5b665e]'>A more thoughtful home starts here.</p>
                </div>
              </div>

              <form className='space-y-4' onSubmit={handleSubmit}>
                <div>
                  <label htmlFor='register-username' className='mb-1.5 block text-sm font-medium text-[#1d4d40]'>Username</label>
                  <input
                    id='register-username'
                    name='name'
                    type='text'
                    autoComplete='username'
                    placeholder='Choose a username'
                    required
                    className='w-full rounded-xl border border-[#c7c2a4] bg-white px-4 py-3 text-[#173c33] placeholder:text-[#6b7b73] outline-none transition focus:border-[#1d4d40] focus:ring-4 focus:ring-[#1d4d40]/10'
                  />
                </div>

                <div>
                  <label htmlFor='register-email' className='mb-1.5 block text-sm font-medium text-[#1d4d40]'>Email</label>
                  <input
                    id='register-email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    placeholder='you@example.com'
                    required
                    className='w-full rounded-xl border border-[#c7c2a4] bg-white px-4 py-3 text-[#173c33] placeholder:text-[#6b7b73] outline-none transition focus:border-[#1d4d40] focus:ring-4 focus:ring-[#1d4d40]/10'
                  />
                </div>

                <div>
                  <label htmlFor='register-phone' className='mb-1.5 block text-sm font-medium text-[#1d4d40]'>Phone</label>
                  <input
                    id='register-phone'
                    name='phone'
                    type='tel'
                    autoComplete='tel'
                    placeholder='Your phone number'
                    required
                    className='w-full rounded-xl border border-[#c7c2a4] bg-white px-4 py-3 text-[#173c33] placeholder:text-[#6b7b73] outline-none transition focus:border-[#1d4d40] focus:ring-4 focus:ring-[#1d4d40]/10'
                  />
                </div>

                <div>
                  <label htmlFor='register-password' className='mb-1.5 block text-sm font-medium text-[#1d4d40]'>Password</label>
                  <input
                    id='register-password'
                    name='password'
                    type='password'
                    autoComplete='new-password'
                    placeholder='Create a password'
                    required
                    className='w-full rounded-xl border border-[#c7c2a4] bg-white px-4 py-3 text-[#173c33] placeholder:text-[#6b7b73] outline-none transition focus:border-[#1d4d40] focus:ring-4 focus:ring-[#1d4d40]/10'
                  />
                </div>

                <button
                  type='submit'
                  className='mt-2 w-full rounded-xl bg-[#1d4d40] px-4 py-3 text-base font-semibold text-[#f9f3dc] shadow-lg shadow-[#1d4d40]/20 transition hover:bg-[#153c32]'
                >
                  Create account
                </button>
              </form>

              {message && <p role='status' className='mt-4 text-center text-sm text-[#1d4d40]'>{message}</p>}

              <p className='mt-6 text-center text-sm text-[#445a53]'>
                Already have an account?{' '}
                <Link to='/l' className='font-semibold text-[#1d4d40] hover:text-[#0f352d]'>Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Register
