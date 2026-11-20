import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Login = () => {
  const [message, setMessage] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const handleSubmit = async(event) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const credentials = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credentials),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Unable to log in.')
      }

      navigate('/h')
    } catch (error) {
      setMessage(error.message || 'Unable to log in. Please try again.')
    }
  }

  return (
    <div className='min-h-screen bg-[#f5efd0] flex items-center justify-center p-6'>
      <div className='w-full max-w-5xl overflow-hidden rounded-[28px] shadow-[0_20px_60px_rgba(17,39,31,0.15)] border border-[#d9d1a5] bg-white'>
        <div className='grid md:grid-cols-2'>
          <div
            className='relative hidden md:block min-h-[620px] bg-cover bg-center'
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80')",
            }}
          >
            <div className='absolute inset-0 bg-[#113b2f]/55' />
            <div className='relative z-10 flex h-full flex-col justify-between p-10 text-[#f9f3dc]'>
              <div className='text-sm uppercase tracking-[0.3em] font-medium'>Handcrafted Good Homes</div>
              <div>
                <p className='text-4xl font-semibold leading-tight mb-4'>Welcome back to your cozy corner.</p>
                <p className='text-sm text-[#eef5ec] max-w-xs'>Discover warm, minimalist essentials made to bring comfort and calm into modern living.</p>
              </div>
            </div>
          </div>

          <div className='bg-[#f9f5e8] p-8 md:p-12 flex items-center justify-center'>
            <div className='w-full max-w-md'>
              <div className='mb-8'>
                <Link to='/h' className='mb-6 inline-flex rounded-full border border-[#aab39a] px-4 py-2 text-sm font-semibold text-[#1d4d40] transition hover:bg-[#efecd9]'>
                  ← Back to home
                </Link>
                <div className='text-center md:text-left'>
                <p className='text-sm uppercase tracking-[0.3em] text-[#1d4d40] font-semibold'>Login</p>
                <h1 className='mt-3 text-4xl font-bold text-[#153c32]'>Welcome back</h1>
                </div>
              </div>

              <form className='space-y-5' onSubmit={handleSubmit}>
                <div>
                  <label htmlFor='login-email' className='mb-2 block text-sm font-medium text-[#1d4d40]'>Email</label>
                  <input
                    id='login-email'
                    name='email'
                    type='email'
                    placeholder='you@example.com'
                    autoComplete='email'
                    required
                    className='w-full rounded-xl border border-[#c7c2a4] bg-white px-4 py-3 text-[#173c33] placeholder:text-[#6b7b73] outline-none transition focus:border-[#1d4d40] focus:ring-4 focus:ring-[#1d4d40]/10'
                  />
                </div>

                <div>
                  <label htmlFor='login-password' className='mb-2 block text-sm font-medium text-[#1d4d40]'>Password</label>
                  <input
                    id='login-password'
                    name='password'
                    type='password'
                    placeholder='Enter your password'
                    autoComplete='current-password'
                    required
                    className='w-full rounded-xl border border-[#c7c2a4] bg-white px-4 py-3 text-[#173c33] placeholder:text-[#6b7b73] outline-none transition focus:border-[#1d4d40] focus:ring-4 focus:ring-[#1d4d40]/10'
                  />
                </div>

                <div className='flex items-center justify-between text-sm'>
                  <label className='flex items-center gap-2 text-[#3d4b46]'>
                    <input type='checkbox' className='h-4 w-4 accent-[#1d4d40]' />
                    Remember me
                  </label>
                  <Link to='/r' className='font-medium text-[#1d4d40] hover:text-[#0f352d]'>Create account</Link>
                </div>

                <button
                  type='submit'
                  className='w-full rounded-xl bg-[#1d4d40] px-4 py-3 text-base font-semibold text-[#f9f3dc] shadow-lg shadow-[#1d4d40]/20 transition hover:bg-[#153c32]'
                >
                  Login
                </button>
              </form>

              {location.state?.registrationSuccess && (
                <p role='status' className='mt-4 text-center text-sm text-[#1d4d40]'>
                  Account created successfully. Please log in.
                </p>
              )}
              {message && <p role='alert' className='mt-4 text-center text-sm text-red-700'>{message}</p>}

              <div className='mt-6 text-center text-sm text-[#445a53]'>
                Need an account?{' '}
                <Link to='/r' className='font-semibold text-[#1d4d40] hover:text-[#0f352d]'>Register now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login