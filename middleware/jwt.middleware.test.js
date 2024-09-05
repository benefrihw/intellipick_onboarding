import jwt from "jsonwebtoken";
import { accessToken, refreshToken } from "./jwt.middleware.js";

process.env.ACCESS_TOKEN_SECRET_KEY = "access_token_test_key";
process.env.REFRESH_TOKEN_SECRET_KEY = "refresh_token_test_key";

describe("token 발급, 검증 테스트", () => {
  const mockUser = {
    id: 1,
    username: "JIN HO",
    nickname: "Mentos",
    authorities: [
      {
        authorityName: "ROLE_USER",
      },
    ],
  };

  // accessToken 발급 테스트
  it("accessToken 발급", () => {
    const token = accessToken(mockUser);
    expect(token).toBeDefined();

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    expect(decoded.username).toBe(mockUser.username);
  });

  // refreshToken 발급 테스트
  it("refreshToken 발급", () => {
    const token = refreshToken(mockUser);
    expect(token).toBeDefined();

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
    expect(decoded.username).toBe(mockUser.username);
  });

  // accessToken 검증 테스트
  it("accessToken 검증", () => {
    const token = accessToken(mockUser);
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

    expect(decoded).toBeDefined();
    expect(decoded.username).toBe(mockUser.username);
  });
});
