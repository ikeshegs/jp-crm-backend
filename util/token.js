const jwt = require('jsonwebtoken');

const JWT_LIFE_SPAN = '1h';

const signToken = async (payload, exp = JWT_LIFE_SPAN) => {
  if (!payload) throw new Error('No User details');

  const { uuid, email, admin } = payload;
  const jwtPayload = {
    uuid,
    email,
    admin,
    iat: Math.floor(Date.now() / 1000) - 30,
  };

  const token = await jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: exp });
  return token;
};

const verifyToken = async (payload, exp = JWT_LIFE_SPAN) => {
  try {
    const result = jwt.verify(payload, process.env.JWT_SECRET, { expiresIn: exp });
    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

const decodeToken = async (token) => {
  try {
    const decodedToken = await jwt.decode(token);
    return decodedToken;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { signToken, verifyToken, decodeToken };
