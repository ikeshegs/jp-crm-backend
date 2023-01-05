const jwt = require('jsonwebtoken');

const JWT_LIFE_SPAN = '30d';

const signToken = async (payload) => {
  if (!payload) throw new Error('No User details');

  const { uuid, email, admin } = payload;
  const jwtPayload = {
    uuid,
    email,
    admin,
    iat: Math.floor(Date.now() / 1000) - 30,
  };

  const token = await jwt.sign(jwtPayload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    jwtid: process.env.JWT_ID,
    expiresIn: JWT_LIFE_SPAN,
  });

  return token;
};

const verifyToken = async token => {
  
}

module.exports = { signToken, verifyToken };
