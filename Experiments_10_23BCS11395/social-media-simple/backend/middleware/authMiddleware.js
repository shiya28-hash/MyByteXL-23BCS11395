const { verifyToken } = require('../utils/helpers');
function auth(req,res,next){
  const h = req.headers.authorization;
  if(!h) return res.status(401).json({ error: 'auth required' });
  const parts = h.split(' ');
  if(parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'invalid auth' });
  const payload = verifyToken(parts[1]);
  if(!payload) return res.status(403).json({ error: 'invalid token' });
  req.user = payload;
  next();
}
module.exports = auth;
