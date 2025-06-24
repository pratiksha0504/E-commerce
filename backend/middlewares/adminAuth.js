import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
      console.log("Authorization Header:", req.headers.authorization); // ✅ Add this here

    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.json({ success: false, message: "Not Authorized. Login Again" });
    }

    const token = authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Check if token email matches admin email
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "Not Authorized. Login Again" });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.json({ success: false, message: "Authentication Failed", error: error.message });
  }
};

export default adminAuth;
