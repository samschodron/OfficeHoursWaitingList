import auth from "../firebase/config/firebase-config.js";

export const VerifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = await auth.verifyIdToken(token);

        if (decodedToken) {
            const uid = decodedToken.uid;
            // set the uid to this object which is available everywhere within the same request
            req.app.locals.uid = uid

            return next();
        }
    } catch (e) {
        return res.status(401).json({ message: "unauthorized access" });
    }
};