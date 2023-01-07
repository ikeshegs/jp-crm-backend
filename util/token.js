const jwt = require('jsonwebtoken');

const JWT_LIFE_SPAN = '30d';
const options = {
  algorithm: 'HS256',
  jwtid: process.env.JWT_ID,
  expiresIn: JWT_LIFE_SPAN,
};

const signToken = async (payload) => {
  if (!payload) throw new Error('No User details');

  const { uuid, email, admin } = payload;
  const jwtPayload = {
    uuid,
    email,
    admin,
    iat: Math.floor(Date.now() / 1000) - 30,
  };

  const token = await jwt.sign(jwtPayload, process.env.JWT_SECRET, options);

  return token;
};

const verifyToken = async (payload) => {
  try {
    const result = jwt.verify(payload, process.env.JWT_SECRET, options);
    return result;
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
};

const decodeToken = async (token) => {
  try {
    const decodedToken = await jwt.decode(token);
    return decodedToken;
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
}

module.exports = { signToken, verifyToken, decodeToken };
