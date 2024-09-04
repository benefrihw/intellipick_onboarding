import express from "express";
import "dotenv/config";
import userRouter from "./routers/user.router.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log(`${PORT}번 포트로 연결되었습니다.`);
});
