import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <main className='min-h-screen bg-[#f9f5e8] text-[#173c33]'>
            <nav className='sticky top-0 z-20 border-b border-[#e5dfc6] bg-[#f9f5e8]/95 backdrop-blur'>
                <div className='mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4'>
                    <Link to='/h' className='text-lg font-bold tracking-[0.18em] text-[#153c32]'>
                        GOOD HOMES
                    </Link>
                    <div className='flex items-center gap-5 text-sm font-medium text-[#445a53] sm:gap-8'>
                        <Link to='/h' className='transition-colors hover:text-[#153c32]'>Home</Link>
                        <Link to='/p' className='transition-colors hover:text-[#153c32]'>Products</Link>
                        <Link to='/l' className='transition-colors hover:text-[#153c32]'>Login</Link>
                        <Link to='/r' className='rounded-full bg-[#1d4d40] px-4 py-2 text-[#f9f3dc] transition-colors hover:bg-[#153c32]'>Register</Link>
                    </div>
                </div>
            </nav>

            <section className='mx-auto grid max-w-7xl items-center gap-10 px-6 py-12 md:grid-cols-2 md:py-20'>
                <div className='py-6 md:py-12'>
                    <p className='mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#6d7858]'>
                        Thoughtful pieces, made for living
                    </p>
                    <h1 className='max-w-xl text-5xl font-semibold leading-[1.08] text-[#153c32] sm:text-6xl'>
                        Make room for a little more calm.
                    </h1>
                    <p className='mt-6 max-w-lg text-lg leading-relaxed text-[#5b665e]'>
                        Discover handcrafted, natural home essentials that bring warmth, character, and everyday comfort to your space.
                    </p>
                    <div className='mt-8 flex flex-wrap gap-4'>
                        <Link to='/p' className='rounded-full bg-[#1d4d40] px-7 py-3.5 text-sm font-semibold text-[#f9f3dc] shadow-lg shadow-[#1d4d40]/15 transition hover:-translate-y-0.5 hover:bg-[#153c32]'>
                            Explore the collection
                        </Link>
                        <Link to='/r' className='rounded-full border border-[#aab39a] px-7 py-3.5 text-sm font-semibold text-[#1d4d40] transition hover:bg-[#efecd9]'>
                            Join our community
                        </Link>
                    </div>
                    <div className='mt-10 flex items-center gap-3 text-sm text-[#68736a]'>
                        <span className='h-px w-10 bg-[#aab39a]' />
                        Made slowly. Loved for years.
                    </div>
                </div>
                <div className='relative'>
                    <div className='absolute -bottom-4 -left-4 h-2/3 w-2/3 rounded-[2rem] bg-[#e9e3c8]' />
                    <img
                        src='https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85'
                        alt='Warm, sunlit living room with natural textures and comfortable furniture'
                        className='relative h-[380px] w-full rounded-[2rem] object-cover shadow-xl sm:h-[500px]'
                    />
                    <div className='absolute bottom-5 left-5 rounded-2xl bg-[#f9f5e8]/95 px-5 py-4 shadow-lg backdrop-blur'>
                        <p className='text-xs uppercase tracking-[0.2em] text-[#68736a]'>A softer kind of home</p>
                        <p className='mt-1 font-semibold text-[#153c32]'>Natural materials. Timeless design.</p>
                    </div>
                </div>
            </section>

            <section className='bg-[#eee9d5] px-6 py-16 md:py-20'>
                <div className='mx-auto max-w-3xl text-center'>
                    <p className='text-xs font-semibold uppercase tracking-[0.3em] text-[#6d7858]'>Our story</p>
                    <h2 className='mt-4 text-3xl font-semibold text-[#153c32] sm:text-4xl'>A home should feel like a deep breath.</h2>
                    <p className='mx-auto mt-5 max-w-2xl leading-relaxed text-[#5b665e]'>
                        Handcrafted Good Homes began with a love for simple forms, natural textures, and objects made with intention. We carefully curate pieces that bring warmth and lasting comfort to modern living.
                    </p>
                    <Link to='/p' className='mt-7 inline-flex rounded-full border border-[#1d4d40] px-6 py-3 text-sm font-semibold text-[#1d4d40] transition hover:bg-[#1d4d40] hover:text-[#f9f3dc]'>
                        Discover our craft
                    </Link>
                </div>
            </section>

            <section className='px-6 py-16 md:py-20'>
                <div className='mx-auto max-w-6xl'>
                    <div className='mx-auto mb-10 max-w-2xl text-center'>
                        <p className='text-xs font-semibold uppercase tracking-[0.3em] text-[#6d7858]'>Get in touch</p>
                        <h2 className='mt-4 text-3xl font-semibold text-[#153c32]'>We’d love to hear from you.</h2>
                        <p className='mt-4 leading-relaxed text-[#5b665e]'>
                            Questions about a piece, custom orders, or styling your home? Send us a note and our team will be happy to help.
                        </p>
                    </div>
                    <div className='grid gap-10 rounded-[2rem] border border-[#e5dfc6] bg-white/70 p-7 shadow-sm md:grid-cols-2 md:p-10'>
                        <div className='flex flex-col justify-between gap-8'>
                            <div>
                                <h3 className='text-xl font-semibold text-[#153c32]'>Studio & inquiries</h3>
                                <p className='mt-3 max-w-md leading-relaxed text-[#5b665e]'>
                                    We’re available Monday through Friday for order tracking, wholesale requests, and care instructions.
                                </p>
                            </div>
                            <div className='space-y-5 text-sm'>
                                <div>
                                    <p className='font-semibold uppercase tracking-wider text-[#6d7858]'>Email</p>
                                    <p className='mt-1 text-[#445a53]'>hello@handcraftedgoodhomes.com</p>
                                </div>
                                <div>
                                    <p className='font-semibold uppercase tracking-wider text-[#6d7858]'>Phone</p>
                                    <p className='mt-1 text-[#445a53]'>+1 (555) 234-5678</p>
                                </div>
                                <div>
                                    <p className='font-semibold uppercase tracking-wider text-[#6d7858]'>Studio hours</p>
                                    <p className='mt-1 text-[#445a53]'>Mon – Fri: 9:00 AM – 5:00 PM</p>
                                </div>
                            </div>
                        </div>
                        <form className='space-y-4'>
                            <div>
                                <label htmlFor='contact-name' className='mb-1.5 block text-sm font-medium text-[#445a53]'>Name</label>
                                <input id='contact-name' type='text' placeholder='Your name' className='w-full rounded-xl border border-[#d6d1bb] bg-[#f9f5e8] px-4 py-3 text-[#173c33] outline-none transition focus:border-[#1d4d40] focus:ring-4 focus:ring-[#1d4d40]/10' />
                            </div>
                            <div>
                                <label htmlFor='contact-email' className='mb-1.5 block text-sm font-medium text-[#445a53]'>Email</label>
                                <input id='contact-email' type='email' placeholder='you@example.com' className='w-full rounded-xl border border-[#d6d1bb] bg-[#f9f5e8] px-4 py-3 text-[#173c33] outline-none transition focus:border-[#1d4d40] focus:ring-4 focus:ring-[#1d4d40]/10' />
                            </div>
                            <div>
                                <label htmlFor='contact-message' className='mb-1.5 block text-sm font-medium text-[#445a53]'>Message</label>
                                <textarea id='contact-message' rows='4' placeholder='How can we help?' className='w-full resize-none rounded-xl border border-[#d6d1bb] bg-[#f9f5e8] px-4 py-3 text-[#173c33] outline-none transition focus:border-[#1d4d40] focus:ring-4 focus:ring-[#1d4d40]/10' />
                            </div>
                            <button type='submit' className='rounded-full bg-[#1d4d40] px-6 py-3 text-sm font-semibold text-[#f9f3dc] transition hover:bg-[#153c32]'>
                                Send message
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <footer className='border-t border-[#e5dfc6] px-6 py-6 text-center text-sm text-[#68736a]'>
                © Handcrafted Good Homes
            </footer>
        </main>
    )
}

export default Home
