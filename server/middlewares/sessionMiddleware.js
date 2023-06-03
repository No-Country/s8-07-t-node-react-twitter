import Session from '../models/Session.js';

const sessionMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Si el token no se encuentra termina con error
    if (!authHeader) {
      return res.status(401).json({ error: 'No se ha iniciado sesión' });
    }

    const token = authHeader.split(' ')[1];

    if(token === undefined) {
      res.status(401).json({ error: 'Token de sesión inválido' }); // Envía una respuesta de error
    }

    const session = await Session.findOne({ sessionToken: token }); // Busca el token de sesión en la colección

    if (session) {
      // El token de sesión es válido
      req.user = { id: session.userId.toString() }; // Envia el id del usuario en la respuesta
      next(); // Continúa con la siguiente función de middleware o ruta
    } else {
      // El token de sesión no es válido
      res.status(401).json({ error: 'Token de sesión inválido' }); // Envía una respuesta de error
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error de autenticación' }); // Manejo de errores
  }
};

export { sessionMiddleware };
