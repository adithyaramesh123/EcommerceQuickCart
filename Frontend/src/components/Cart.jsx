import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Cart = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('good-homes-cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem('good-homes-cart', JSON.stringify(cart))
  }, [cart])

  const updateQuantity = (productId, quantity) => {
    setCart((currentCart) =>
      quantity < 1
        ? currentCart.filter((item) => item.id !== productId)
        : currentCart.map((item) => item.id === productId ? { ...item, quantity } : item),
    )
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <main className='min-h-screen bg-[#f9f5e8] px-6 py-8 text-[#173c33]'>
      <div className='mx-auto max-w-5xl'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <Link to='/h' className='text-lg font-bold tracking-[0.18em] text-[#153c32]'>GOOD HOMES</Link>
          <Link to='/p' className='text-sm font-semibold text-[#1d4d40] underline decoration-[#aab39a] underline-offset-4 hover:text-[#153c32]'>
            ← Continue shopping
          </Link>
        </div>

        <header className='mb-8 mt-12'>
          <p className='text-xs font-semibold uppercase tracking-[0.3em] text-[#6d7858]'>Your selection</p>
          <h1 className='mt-3 text-4xl font-semibold text-[#153c32]'>Shopping cart</h1>
        </header>

        {cart.length === 0 ? (
          <section className='rounded-[1.5rem] border border-[#e5dfc6] bg-white/70 px-6 py-16 text-center'>
            <p className='text-xl font-semibold text-[#153c32]'>Your cart is waiting for something lovely.</p>
            <p className='mt-2 text-[#5b665e]'>Browse the collection and add your favorite pieces.</p>
            <Link to='/p' className='mt-6 inline-flex rounded-full bg-[#1d4d40] px-6 py-3 text-sm font-semibold text-[#f9f3dc] transition hover:bg-[#153c32]'>
              Explore products
            </Link>
          </section>
        ) : (
          <div className='grid gap-8 lg:grid-cols-[1fr_320px]'>
            <section className='space-y-4'>
              {cart.map((item) => (
                <article key={item.id} className='flex flex-col gap-5 rounded-[1.5rem] border border-[#e5dfc6] bg-white/80 p-4 sm:flex-row sm:items-center'>
                  <img src={item.image} alt={item.alt} className='h-36 w-full rounded-xl object-cover sm:w-36' />
                  <div className='flex flex-1 flex-wrap items-center justify-between gap-4'>
                    <div>
                      <p className='text-xs uppercase tracking-wider text-[#7b806b]'>{item.category}</p>
                      <h2 className='mt-1 text-lg font-semibold text-[#153c32]'>{item.name}</h2>
                      <p className='mt-2 font-semibold text-[#1d4d40]'>₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                    <div className='flex items-center gap-3'>
                      <label htmlFor={`quantity-${item.id}`} className='text-sm text-[#5b665e]'>Qty</label>
                      <input
                        id={`quantity-${item.id}`}
                        type='number'
                        min='1'
                        value={item.quantity}
                        onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                        className='w-20 rounded-lg border border-[#d6d1bb] bg-[#f9f5e8] px-3 py-2 text-center text-[#173c33] outline-none focus:border-[#1d4d40]'
                      />
                      <button
                        type='button'
                        onClick={() => updateQuantity(item.id, 0)}
                        className='text-sm font-medium text-[#8b5545] hover:text-[#673a2f]'
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <aside className='h-fit rounded-[1.5rem] border border-[#e5dfc6] bg-white/80 p-6'>
              <h2 className='text-lg font-semibold text-[#153c32]'>Order summary</h2>
              <div className='mt-5 flex justify-between border-t border-[#e5dfc6] pt-5 text-sm text-[#5b665e]'>
                <span>Subtotal</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <p className='mt-3 text-xs leading-relaxed text-[#7b806b]'>Shipping and taxes are calculated at checkout.</p>
              <button type='button' className='mt-6 w-full rounded-xl bg-[#1d4d40] px-4 py-3 font-semibold text-[#f9f3dc] transition hover:bg-[#153c32]'>
                Continue to checkout
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}

export default Cart
