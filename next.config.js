const removeImports = require('next-remove-imports')();
module.exports = removeImports({
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
})
