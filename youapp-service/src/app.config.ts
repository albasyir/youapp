export const config = () => ({
  app: {
    key: process.env.APP_KEY || "Sangat Rahasia",
    name: process.env.APP_NAME || "YouApp"
  },
  mongo: {
    url: process.env.MONGO_URL
  },
  jwt: {
    secret: process.env.JWT_SECRET
  }
});

export type Config = ReturnType<typeof config>;