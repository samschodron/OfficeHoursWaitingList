import auth from "../firebase/config/firebase-config.js";

export const VerifyToken = async (req, res, next) => {
    console.log(req.header("Authorization"))
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decodedToken = await auth.verifyIdToken(token);
        if (decodedToken) {
            const uid = decodedToken.uid;
            req.user = decodedToken;
            console.log('VERIFY TOKEN MIDDLEWARE - decoded token uid: ', decodedToken.uid)
            // set the uid to this object which is available everywhere within the same request
            // res.locals.uid = uid
            req.app.locals.uid = uid
            return next();
        }
    } catch (e) {
        return res.status(401).json({ message: "unauthorized access" });
    }
};