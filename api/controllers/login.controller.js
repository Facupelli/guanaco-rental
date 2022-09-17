const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function login(req, res, next) {
  const { email, name } = req.body;

  try {
    let user;
    user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        role: true,
        petitionSent: true,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          fullName: name,
        },
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET
    );

    return res
      .cookie("api_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        message: "Logged in successfully",
        role: user.role,
        petitionSent: user.petitionSent,
      });
  } catch (e) {
    next(e);
  }
}

async function logout(req, res, next) {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
}

module.exports = {
  login,
  logout,
};
