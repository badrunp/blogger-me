export default process.env.NODE_ENV !== 'production' ? process.env.MONGO_URL_DEV : process.env.MONGO_URL_PROD

// export default "http://localhost:3000/api"
// export default `https://${process.env.VERCEL_URL}/api`