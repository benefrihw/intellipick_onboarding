import express from "express";
import "dotenv/config";
import userRouter from "./routers/user.router.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

// Swagger 설정
const swaggerOption = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "회원가입 및 로그인",
      version: "1.0.0",
      description: "회원가입, 로그인, 토큰 발급/검증 API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routers/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOption);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log(`${PORT}번 포트로 연결되었습니다.`);
});
