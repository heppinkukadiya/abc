exports.auth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            });
        }

        const token = authHeader.split(" ")[1];

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode; // can be { email } or { role: "ADMIN" }
            next();
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({
                    success: false,
                    message: "Token has expired"
                });
            }

            return res.status(403).json({
                success: false,
                message: "Invalid token"
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal error in auth middleware"
        });
    }
};
