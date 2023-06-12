const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  // Verificar si se proporcionó un token
  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, 'secreto');

    // Almacenar la información del usuario en el objeto de solicitud
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido' });
  }
};

module.exports = authMiddleware;