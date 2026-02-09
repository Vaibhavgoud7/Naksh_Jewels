import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const token = req.headers.token || req.cookies.token;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Please Login Again.' });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // 🚨 THE FIX: Create an empty object if req.body is undefined
        if (!req.body) {
            req.body = {}; 
        }
        
        // Now this line is safe
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default authMiddleware;