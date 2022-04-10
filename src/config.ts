export default {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE,
  mongoURI: process.env.MONGO_URI,
};
