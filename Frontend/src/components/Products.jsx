
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_URL = 'http://localhost:5000/api/products'
const IMAGE_BASE_URL = 'http://localhost:5000'

// Convert backend image path into a usable image URL
const getImageUrl = (image) => {
    if (!image) return ''

    // If image already has a complete URL, use it
    if (
        image.startsWith('http://') ||
        image.startsWith('https://') ||
        image.startsWith('data:')
    ) {
        return image
    }

    // Clean image path
    const cleanPath = image
        .replace(/\\/g, '/')
        .replace(/^\/+/, '')

    // Add uploads folder if missing
    const imagePath = cleanPath.startsWith('uploads/')
        ? cleanPath
        : `uploads/${cleanPath}`

    return `${IMAGE_BASE_URL}/${imagePath}`
}

const readCart = () => {
    try {
        const savedCart = localStorage.getItem('good-homes-cart')
        return savedCart ? JSON.parse(savedCart) : []
    } catch {
        return []
    }
}

const Products = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [cart, setCart] = useState(readCart)

    const navigate = useNavigate()

    // FETCH PRODUCTS
    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const response = await fetch(API_URL)

                if (!response.ok) {
                    throw new Error(`Server Error: ${response.status}`)
                }

                const result = await response.json()

                console.log('API Response:', result)

                if (!result.success || !Array.isArray(result.products)) {
                    throw new Error('Invalid products data from backend')
                }

                const formattedProducts = result.products
                    .filter(product => product.isActive !== false)
                    .map(product => ({
                        id: product._id,
                        name: product.productName,
                        category: product.category,
                        price: product.discountPrice ?? product.price,

                        // IMAGE URL FIX
                        image: getImageUrl(product.images?.[0]),

                        alt: `${product.productName} product`,
                        stock: product.stock
                    }))

                console.log('Formatted Products:', formattedProducts)

                setProducts(formattedProducts)

            } catch (error) {

                console.error('Product Fetch Error:', error)

                setError(error.message || 'Failed to fetch products')

            } finally {

                setLoading(false)

            }

        }

        fetchProducts()

    }, [])

    // SAVE CART
    useEffect(() => {

        localStorage.setItem(
            'good-homes-cart',
            JSON.stringify(cart)
        )

    }, [cart])

    // ADD TO CART
    const addToCart = (product) => {

        const existingProduct = cart.find(
            item => item.id === product.id
        )

        const updatedCart = existingProduct

            ? cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )

            : [...cart, { ...product, quantity: 1 }]

        setCart(updatedCart)

        navigate('/c')
    }

    // CART COUNT
    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    )

    return (

        <main className='min-h-screen bg-[#f9f5e8] text-[#173c33]'>

            {/* NAVBAR */}
            <nav className='border-b border-[#e5dfc6] bg-[#f9f5e8]/95'>

                <div className='mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4'>

                    <Link
                        to='/h'
                        className='text-lg font-bold tracking-[0.18em] text-[#153c32]'
                    >
                        GOOD HOMES
                    </Link>

                    <div className='flex items-center gap-5 text-sm font-medium sm:gap-8'>

                        <Link to='/h'>
                            Home
                        </Link>

                        <span className='font-semibold'>
                            Products
                        </span>

                        <Link
                            to='/c'
                            className='rounded-full bg-[#1d4d40] px-4 py-2 text-[#f9f3dc]'
                        >
                            Cart ({cartCount})
                        </Link>

                    </div>

                </div>

            </nav>

            {/* PRODUCT SECTION */}
            <section className='mx-auto max-w-7xl px-6 py-12 md:py-16'>

                <div className='mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end'>

                    <div>

                        <p className='text-xs font-semibold uppercase tracking-[0.3em] text-[#6d7858]'>
                            Made for everyday living
                        </p>

                        <h1 className='mt-3 text-4xl font-semibold sm:text-5xl'>
                            The home collection
                        </h1>

                        <p className='mt-4 max-w-xl leading-relaxed text-[#5b665e]'>
                            Thoughtful textures, natural materials,
                            and timeless pieces to make your space feel like you.
                        </p>

                    </div>

                    <Link
                        to='/h'
                        className='text-sm font-semibold underline'
                    >
                        ← Back to home
                    </Link>

                </div>

                {/* LOADING */}
                {loading && (
                    <p className='py-12 text-center'>
                        Loading products...
                    </p>
                )}

                {/* ERROR */}
                {error && (
                    <div className='py-12 text-center text-red-700'>

                        <p>{error}</p>

                        <button
                            onClick={() => window.location.reload()}
                            className='mt-4 rounded-full bg-[#1d4d40] px-5 py-2 text-white'
                        >
                            Try Again
                        </button>

                    </div>
                )}

                {/* NO PRODUCTS */}
                {!loading && !error && products.length === 0 && (
                    <p className='py-12 text-center'>
                        No products are available right now.
                    </p>
                )}

                {/* DISPLAY PRODUCTS */}
                {!loading && !error && products.length > 0 && (

                    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>

                        {products.map(product => (

                            <article
                                key={product.id}
                                className='overflow-hidden rounded-[1.5rem] border border-[#e5dfc6] bg-white/80 shadow-sm transition hover:-translate-y-1 hover:shadow-lg'
                            >

                                {/* PRODUCT IMAGE */}
                                {product.image ? (

                                    <img
                                        src={product.image}
                                        alt={product.alt}
                                        className='h-64 w-full object-cover'
                                        onError={(e) => {
                                            console.error(
                                                'Image failed to load:',
                                                e.currentTarget.src
                                            )
                                            e.currentTarget.style.display = 'none'
                                        }}
                                    />

                                ) : (

                                    <div className='flex h-64 items-center justify-center bg-[#eee9d5]'>
                                        No Image
                                    </div>

                                )}

                                <div className='p-5'>

                                    <p className='text-xs uppercase tracking-wider text-[#7b806b]'>
                                        {product.category}
                                    </p>

                                    <h2 className='mt-2 text-lg font-semibold'>
                                        {product.name}
                                    </h2>

                                    <div className='mt-4 flex items-center justify-between gap-3'>

                                        <p className='font-semibold'>
                                            ₹{Number(product.price).toLocaleString('en-IN')}
                                        </p>

                                        <button
                                            type='button'
                                            onClick={() => addToCart(product)}
                                            disabled={product.stock < 1}
                                            className='rounded-full bg-[#1d4d40] px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50'
                                        >
                                            {product.stock < 1
                                                ? 'Out of stock'
                                                : 'Add to cart'}
                                        </button>

                                    </div>

                                </div>

                            </article>

                        ))}

                    </div>

                )}

            </section>

        </main>

    )
}

export default Products
