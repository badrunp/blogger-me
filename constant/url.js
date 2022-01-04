// export default process.env.NODE_ENV !== 'production' ? process.env.NEXT_PUBLIC_URL : process.env.VERCEL_URL

// export default "http://localhost:3000/api"
export default `https://${process.env.VERCEL_URL}/api`