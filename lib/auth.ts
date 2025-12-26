import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function generateToken(user: any) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,   // ✅ ADD NAME
      email: user.email,
      role: user.role,
    },
    SECRET,
    { expiresIn: "1d" }
  );
}
