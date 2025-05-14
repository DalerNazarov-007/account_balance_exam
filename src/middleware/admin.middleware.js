function authorizeAdmin(req, res, next) {
    if (!req.user) {
        return res.status(401).send({ message: "Unauthorized: User not authenticated" });
    }

    if (req.user.role !== "admin") {
        return res.status(403).send({ message: "Forbidden: Only admins can perform this action" });
    }

    next();
}

module.exports = authorizeAdmin;
