import { useState } from 'react'
import { Link } from 'react-router-dom'

const Icon = ({ name, className = 'h-5 w-5' }) => {
  const icons = {
    grid: <><rect x='3' y='3' width='7' height='7' rx='1' /><rect x='14' y='3' width='7' height='7' rx='1' /><rect x='3' y='14' width='7' height='7' rx='1' /><rect x='14' y='14' width='7' height='7' rx='1' /></>,
    bag: <><path d='M6 8h12l-1 13H7L6 8Z' /><path d='M9 9V6a3 3 0 0 1 6 0v3' /></>,
    users: <><path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' /><circle cx='9' cy='7' r='4' /><path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' /></>,
    cube: <><path d='m21 16-9 5-9-5V8l9-5 9 5v8Z' /><path d='m3 8 9 5 9-5M12 13v8' /></>,
    chart: <><path d='M3 3v18h18' /><path d='m7 16 4-5 4 3 5-7' /></>,
    settings: <><circle cx='12' cy='12' r='3' /><path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06-1.9 1.9-.06-.06A1.65 1.65 0 0 0 16 18.39a1.65 1.65 0 0 0-1 1.51V20h-6v-.09A1.65 1.65 0 0 0 8 18.39a1.65 1.65 0 0 0-1.82.33l-.06.06-1.9-1.9.06-.06A1.65 1.65 0 0 0 4.61 15a1.65 1.65 0 0 0-1.51-1H3v-4h.09A1.65 1.65 0 0 0 4.61 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06 1.9-1.9.06.06A1.65 1.65 0 0 0 8 5.61a1.65 1.65 0 0 0 1-1.51V4h6v.09A1.65 1.65 0 0 0 16 5.61a1.65 1.65 0 0 0 1.82-.33l.06-.06 1.9 1.9-.06.06A1.65 1.65 0 0 0 19.39 9a1.65 1.65 0 0 0 1.51 1H21v4h-.09A1.65 1.65 0 0 0 19.4 15Z' /></>,
    search: <><circle cx='11' cy='11' r='7' /><path d='m20 20-4-4' /></>,
    bell: <><path d='M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9' /><path d='M13.73 21a2 2 0 0 1-3.46 0' /></>,
    arrow: <><path d='M5 12h14M13 6l6 6-6 6' /></>,
    menu: <><path d='M4 6h16M4 12h16M4 18h16' /></>,
    close: <><path d='m6 6 12 12M18 6 6 18' /></>,
  }
  return <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' className={className}>{icons[name]}</svg>
}

const navItems = [
  { label: 'Overview', icon: 'grid' },
  { label: 'Orders', icon: 'bag', count: 12 },
  { label: 'Customers', icon: 'users' },
  { label: 'Products', icon: 'cube' },
  { label: 'Analytics', icon: 'chart' },
]

const Admindash = () => {
  const [activeNav, setActiveNav] = useState('Overview')
  const [mobileNav, setMobileNav] = useState(false)

  return (
    <main className='min-h-screen bg-[#f4f1e7] text-[#17372f]'>
      {mobileNav && <button aria-label='Close navigation' className='fixed inset-0 z-30 bg-[#17372f]/30 lg:hidden' onClick={() => setMobileNav(false)} />}

      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[232px] flex-col bg-[#17372f] px-4 py-5 text-[#eaf0e7] transition-transform lg:translate-x-0 ${mobileNav ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className='flex items-center justify-between px-3'>
          <Link to='/h' className='text-[15px] font-bold tracking-[0.16em]'>GOOD HOMES</Link>
          <button type='button' aria-label='Close menu' onClick={() => setMobileNav(false)} className='text-[#b9c8b9] lg:hidden'><Icon name='close' /></button>
        </div>

        <nav className='mt-10 space-y-1'>
          <p className='mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#91a79b]'>Workspace</p>
          {navItems.map((item) => (
            <button
              key={item.label}
              type='button'
              onClick={() => { setActiveNav(item.label); setMobileNav(false) }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${activeNav === item.label ? 'bg-[#2a503f] font-semibold text-white' : 'text-[#c3d0c7] hover:bg-[#214638] hover:text-white'}`}
            >
              <Icon name={item.icon} className='h-[18px] w-[18px]' />
              <span>{item.label}</span>
              {item.count && <span className='ml-auto rounded-full bg-[#e7b966] px-2 py-0.5 text-[10px] font-bold text-[#17372f]'>{item.count}</span>}
            </button>
          ))}
        </nav>

        <div className='mt-auto'>
          <button type='button' className='mb-3 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#c3d0c7] hover:bg-[#214638] hover:text-white'>
            <Icon name='settings' className='h-[18px] w-[18px]' /> Settings
          </button>
          <div className='flex items-center gap-3 border-t border-white/10 px-3 pt-4'>
            <div className='grid h-9 w-9 place-items-center rounded-full bg-[#e8b96a] text-xs font-bold text-[#17372f]'>AD</div>
            <div className='min-w-0'>
              <p className='truncate text-sm font-semibold'>Adithya</p>
              <p className='text-xs text-[#91a79b]'>Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      <section className='lg:pl-[232px]'>
        <header className='sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-[#dedbcf] bg-[#f8f6ed]/95 px-5 backdrop-blur md:px-8'>
          <div className='flex items-center gap-3'>
            <button type='button' aria-label='Open menu' onClick={() => setMobileNav(true)} className='rounded-lg p-2 text-[#17372f] lg:hidden'><Icon name='menu' /></button>
            <h1 className='text-xl font-semibold text-[#17372f] md:text-2xl'>{activeNav}</h1>
          </div>
          <div className='flex items-center gap-2 md:gap-3'>
            <label className='hidden items-center gap-2 rounded-xl border border-[#dedbcf] bg-white px-3 py-2.5 text-[#7b887f] md:flex'>
              <Icon name='search' className='h-4 w-4' />
              <input aria-label='Search dashboard' placeholder='Search...' className='w-32 bg-transparent text-sm text-[#17372f] outline-none xl:w-48' />
            </label>
            <button type='button' aria-label='Notifications' className='relative grid h-10 w-10 place-items-center rounded-xl border border-[#dedbcf] bg-white text-[#56675f]'>
              <Icon name='bell' className='h-[18px] w-[18px]' />
              <span className='absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#d58b64]' />
            </button>
          </div>
        </header>

        <div className='mx-auto max-w-[1440px] p-5 md:p-8'>
          <div className='mb-6 flex flex-wrap items-end justify-between gap-4'>
            <div>
              <p className='text-sm text-[#7b887f]'>Wednesday, 20 November</p>
              <h2 className='mt-1 text-2xl font-semibold md:text-[28px]'>Good morning, Adithya</h2>
            </div>
            <button type='button' className='flex items-center gap-2 rounded-xl bg-[#17372f] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#214638]'>
              Add product <span className='text-lg leading-none'>+</span>
            </button>
          </div>

          <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
            {[
              { label: 'Total revenue', icon: 'chart', tone: 'bg-[#e8eddf] text-[#58704d]' },
              { label: 'Total orders', icon: 'bag', tone: 'bg-[#f1e8d2] text-[#816638]' },
              { label: 'Customers', icon: 'users', tone: 'bg-[#dfeaed] text-[#56747c]' },
              { label: 'Products', icon: 'cube', tone: 'bg-[#ece1d7] text-[#81634e]' },
            ].map((stat) => (
              <article key={stat.label} className='rounded-[18px] border border-[#e2dfd3] bg-white p-5'>
                <div className='flex items-start justify-between'>
                  <div>
                    <p className='text-sm text-[#7b887f]'>{stat.label}</p>
                    <p className='mt-3 h-8 text-[26px] font-semibold tracking-tight text-[#a4ada7]'>—</p>
                  </div>
                  <div className={`grid h-10 w-10 place-items-center rounded-xl ${stat.tone}`}>
                    <Icon name={stat.icon} className='h-[19px] w-[19px]' />
                  </div>
                </div>
                <div className='mt-4 h-3 w-28 rounded-full bg-[#efeee7]' />
              </article>
            ))}
          </section>

          <section className='mt-5 grid gap-5 xl:grid-cols-[1.65fr_1fr]'>
            <article className='rounded-[18px] border border-[#e2dfd3] bg-white p-5 md:p-6'>
              <div className='flex items-start justify-between'>
                <div>
                  <p className='font-semibold'>Revenue overview</p>
                  <p className='mt-1 text-xs text-[#8a958f]'>Weekly performance</p>
                </div>
                <button type='button' className='rounded-lg border border-[#e2dfd3] px-3 py-2 text-xs font-medium text-[#66766e]'>This week ▾</button>
              </div>
              <div className='mt-7 flex h-52 items-end justify-between gap-3 border-b border-[#eeece3] sm:gap-5'>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className='flex h-full flex-1 flex-col items-center justify-end gap-2'>
                    <div className='flex w-full flex-1 items-end justify-center'>
                      <div className='h-[55%] w-full max-w-10 rounded-t-md bg-[#efeee7]' />
                    </div>
                    <span className='mb-[-24px] text-[11px] text-[#87928c]'>{day}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className='rounded-[18px] border border-[#e2dfd3] bg-white p-5 md:p-6'>
              <div className='flex items-start justify-between'>
                <div>
                  <p className='font-semibold'>Sales by category</p>
                  <p className='mt-1 text-xs text-[#8a958f]'>This month</p>
                </div>
                <button type='button' aria-label='View category report' className='text-[#66766e]'><Icon name='arrow' className='h-4 w-4' /></button>
              </div>
              <div className='mt-6 flex items-center gap-5'>
                <div className='relative h-36 w-36 shrink-0 rounded-full bg-[#efeee7]'>
                  <div className='absolute inset-[18px] grid place-items-center rounded-full bg-white'>
                    <span className='text-xl font-semibold text-[#a4ada7]'>—</span>
                  </div>
                </div>
                <div className='min-w-0 flex-1 space-y-3 text-xs'>
                  {[['Furniture', '#55735f'], ['Decor', '#d2b273'], ['Textiles', '#9cad98'], ['Lighting', '#d9d5c6']].map(([label, color]) => (
                    <div key={label} className='flex items-center gap-2'>
                      <span className='h-2 w-2 rounded-full' style={{ backgroundColor: color }} />
                      <span className='flex-1 text-[#718078]'>{label}</span>
                      <span className='h-2 w-8 rounded-full bg-[#efeee7]' />
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </section>

          <section className='mt-5 overflow-hidden rounded-[18px] border border-[#e2dfd3] bg-white'>
            <div className='flex items-center justify-between px-5 py-5 md:px-6'>
              <div>
                <p className='font-semibold'>Recent orders</p>
                <p className='mt-1 text-xs text-[#8a958f]'>Latest customer purchases</p>
              </div>
              <button type='button' className='text-xs font-semibold text-[#55735f]'>View all</button>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full min-w-[680px] text-left text-sm'>
                <thead className='border-y border-[#eeece3] bg-[#faf9f4] text-xs font-medium text-[#87928c]'>
                  <tr>
                    <th className='px-6 py-3'>Order</th>
                    <th className='px-4 py-3'>Customer</th>
                    <th className='px-4 py-3'>Product</th>
                    <th className='px-4 py-3'>Amount</th>
                    <th className='px-4 py-3'>Status</th>
                    <th className='px-4 py-3'></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan='6' className='px-6 py-12 text-center text-sm text-[#8a958f]'>
                      No recent orders
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </section>
    </main>
  )
}

export default Admindash