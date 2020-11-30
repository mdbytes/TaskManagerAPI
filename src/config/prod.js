// Production keys here
module.exports = {
  port: process.env.PORT,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  sendGridAPI: process.env.SENDGRID_API,
  mongoURL: process.end.MONGO_URL,
};
