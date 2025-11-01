const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
async function hashPassword(p){ return await bcrypt.hash(p, 10); }
async function comparePassword(p,h){ return await bcrypt.compare(p,h); }
function generateToken(user){ return jwt.sign({ id: user._id || user.id, username: user.username }, JWT_SECRET, { expiresIn: '8h' }); }
function verifyToken(token){ try{ return jwt.verify(token, JWT_SECRET); }catch(e){ return null; } }
module.exports = { hashPassword, comparePassword, generateToken, verifyToken };
