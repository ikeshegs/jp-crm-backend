const jwt = require('jsonwebtoken');

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
    expiresIn: 60 * 60 * 24,
  });
  return token;
};

const verifyToken = async (payload) => {
  try {
    const result = jwt.verify(payload, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    return result;
  } catch (error) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Invalid Token to verify' });
  }
};

const decodeToken = async (token) => {
  try {
    const decodedToken = await jwt.decode(token);
    return decodedToken;
  } catch (error) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Invalid Token to Decode' });
  }
};

module.exports = { signToken, verifyToken, decodeToken };
