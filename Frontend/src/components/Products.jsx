import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const readCart = () => {
  const savedCart = localStorage.getItem('good-homes-cart')
  return savedCart ? JSON.parse(savedCart) : []
}

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cart, setCart] = useState(readCart)
  const navigate = useNavigate()

  useEffect(() => {
    const controller = new AbortController()

    const fetchProducts = async() => {
      try {
        const response = await fetch('http://localhost:5000/addproduct', {
          signal: controller.signal,
        })
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.message || 'Unable to load products.')
        }
        if (!Array.isArray(result.products)) {
          throw new Error('The server returned an invalid products response.')
        }

        setProducts(result.products
          .filter((product) => product.isActive !== false)
          .map((product) => ({
            id: product._id,
            name: product.productName,
            category: product.category,
            price: product.discountPrice ?? product.price,
            image: product.images?.[0] || '',
            alt: `${product.productName} product`,
            stock: product.stock,
          })))
      } catch (fetchError) {
        if (!controller.signal.aborted) {
          setError(fetchError.message || 'Unable to load products. Please try again.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchProducts()
    return () => controller.abort()
  }, [])

  useEffect(() => {
    localStorage.setItem('good-homes-cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id)
    const updatedCart = existingProduct
      ? cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
      )
      : [...cart, { ...product, quantity: 1 }]

    localStorage.setItem('good-homes-cart', JSON.stringify(updatedCart))
    setCart(updatedCart)
    navigate('/c')
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <main className='min-h-screen bg-[#f9f5e8] text-[#173c33]'>
      <nav className='border-b border-[#e5dfc6] bg-[#f9f5e8]/95'>
        <div className='mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4'>
          <Link to='/h' className='text-lg font-bold tracking-[0.18em] text-[#153c32]'>GOOD HOMES</Link>
          <div className='flex items-center gap-5 text-sm font-medium text-[#445a53] sm:gap-8'>
            <Link to='/h' className='transition-colors hover:text-[#153c32]'>Home</Link>
            <span className='font-semibold text-[#153c32]'>Products</span>
            <Link to='/c' className='rounded-full bg-[#1d4d40] px-4 py-2 text-[#f9f3dc] transition-colors hover:bg-[#153c32]'>
              Cart ({cartCount})
            </Link>
          </div>
        </div>
      </nav>

      <section className='mx-auto max-w-7xl px-6 py-12 md:py-16'>
        <div className='mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.3em] text-[#6d7858]'>Made for everyday living</p>
            <h1 className='mt-3 text-4xl font-semibold text-[#153c32] sm:text-5xl'>The home collection</h1>
            <p className='mt-4 max-w-xl leading-relaxed text-[#5b665e]'>
              Thoughtful textures, natural materials, and timeless pieces to make your space feel like you.
            </p>
          </div>
          <Link to='/h' className='text-sm font-semibold text-[#1d4d40] underline decoration-[#aab39a] underline-offset-4 hover:text-[#153c32]'>
            ← Back to home
          </Link>
        </div>

        {loading && <p role='status' className='py-12 text-center text-[#5b665e]'>Loading products...</p>}
        {error && <p role='alert' className='py-12 text-center text-red-700'>{error}</p>}
        {!loading && !error && products.length === 0 && (
          <p className='py-12 text-center text-[#5b665e]'>No products are available right now.</p>
        )}

        {!loading && !error && products.length > 0 && <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {products.map((product) => (
            <article key={product.id} className='overflow-hidden rounded-[1.5rem] border border-[#e5dfc6] bg-white/80 shadow-sm transition hover:-translate-y-1 hover:shadow-lg'>
              {product.image
                ? <img src={product.image} alt={product.alt} className='h-64 w-full object-cover' />
                : <div role='img' aria-label={product.alt} className='h-64 bg-[#eee9d5]' />}
              <div className='p-5'>
                <p className='text-xs uppercase tracking-wider text-[#7b806b]'>{product.category}</p>
                <h2 className='mt-2 text-lg font-semibold text-[#153c32]'>{product.name}</h2>
                <div className='mt-4 flex items-center justify-between gap-3'>
                  <p className='font-semibold text-[#1d4d40]'>₹{product.price.toLocaleString('en-IN')}</p>
                  <button
                    type='button'
                    onClick={() => addToCart(product)}
                    disabled={product.stock < 1}
                    className='rounded-full bg-[#1d4d40] px-4 py-2.5 text-sm font-semibold text-[#f9f3dc] transition hover:bg-[#153c32] focus:outline-none focus:ring-4 focus:ring-[#1d4d40]/20'
                  >
                    {product.stock < 1 ? 'Out of stock' : 'Add to cart'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>}
      </section>
    </main>
  )
}

export default Products
