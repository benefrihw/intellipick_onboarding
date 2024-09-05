import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { accessToken, refreshToken } from "../middleware/jwt.middleware.js";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: 회원가입
 *     description: 회원가입을 진행합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: username
 *               password:
 *                 type: string
 *                 description: password
 *               nickname:
 *                 type: string
 *                 description: nickname
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *       400:
 *         description: 회원가입 실패
 */

// 회원가입
router.post("/signup", async (req, res) => {
  const { username, password, nickname } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (existingUser) {
    return res.status(400).json({ message: "이미 등록된 유저입니다." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      nickname,
      authorities: {
        create: [{}],
      },
    },
    include: {
      authorities: true,
    },
  });

  return res.status(201).json({
    username: newUser.username,
    nickname: newUser.nickname,
    authorities: newUser.authorities.map((auth) => ({
      authorityName: auth.authorityName,
    })),
  });
});

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: 로그인
 *     description: 로그인을 진행합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: username
 *               password:
 *                 type: string
 *                 description: password
 *     responses:
 *       200:
 *         description: 로그인 성공
 *       401:
 *         description: 로그인 실패
 */

// 로그인
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "모든 항목을 입력해주세요" });
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      authorities: true,
    },
  });

  if (!existingUser) {
    return res.status(401).json({ message: "해당 유저가 존재하지 않습니다." });
  }

  const isPassword = await bcrypt.compare(password, existingUser.password);
  if (!isPassword) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  const userAccessToken = accessToken(existingUser);
  const userRefreshToken = refreshToken(existingUser);

  return res
    .status(200)
    .json({ accessToken: userAccessToken, refreshToken: userRefreshToken });
});

export default router;
