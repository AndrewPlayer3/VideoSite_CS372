/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    HOSTNAME:   "http://localhost:3000",
    mongodburl: "mongodb://localhost:27017",
    NEXTAUTH_URL: "http://localhost:3000",
    JWT_SECRET: 'VerySecretString',
    GOOGLE_STORAGE: 'https://storage.googleapis.com/fletnix/',
    GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
    GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
    GOOGLE_BUCKET_NAME: process.env.GOOGLE_BUCKET_NAME
  },
  images: {
    domains: ["i.imgur.com", "i.ytimg.com", "storage.googleapis.com"],
  }
}
