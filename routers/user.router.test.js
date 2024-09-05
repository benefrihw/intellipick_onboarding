import request from "supertest";
import express from "express";
import userRouter from "../routers/user.router.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use("/api", userRouter);

// 테스트 전 DB 초기화
beforeAll(async () => {
  await prisma.user.deleteMany();
});

describe("회원가입 및 로그인 API 테스트", () => {
  const mockUser = {
    username: "JIN HO",
    password: "12341234",
    nickname: "Mentos",
  };

  // 회원가입 테스트
  it("회원가입", async () => {
    const response = await request(app).post("/api/signup").send(mockUser);

    expect(response.status).toBe(201);
    expect(response.body.username).toBe(mockUser.username);
    expect(response.body.nickname).toBe(mockUser.nickname);
    expect(response.body).toHaveProperty("authorities");
  });

  // 로그인 테스트
  it("로그인", async () => {
    const response = await request(app).post("/api/login").send({
      username: mockUser.username,
      password: mockUser.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body).toHaveProperty("refreshToken");
  });

  // 로그인 실패 테스트
  it("로그인 실패", async () => {
    const response = await request(app).post("/api/login").send({
      username: mockUser.username,
      password: "invalidPassword",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("비밀번호가 일치하지 않습니다.");
  });

  // 테스트 종료 후 DB 정리
  afterAll(async () => {
    await prisma.$disconnect();
  });
});
