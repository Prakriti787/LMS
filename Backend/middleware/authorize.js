import User from "../models/User.js";

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role)
      return res.status(401).json({ message: "User role not found" });

    const userRole = req.user.role.toLowerCase();
    const allowedRoles = roles.map((r) => r.toLowerCase());
    if (!allowedRoles.includes(userRole))
      return res
        .status(403)
        .json({ message: `User role ${req.user.role} not authorized` });

    next();
  };
};

export { authorize };