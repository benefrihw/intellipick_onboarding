import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// 임시 user 등록
const users = [
  {
    "username": "JIN HO",
    "password": "12341234",
    "nickname": "Mentos"
  }
]

// accessToken 발급
const accessToken = user => {
  const payload = {
    username: user.username,
    nickname: user.nickname,
    authorities: [{ authorityName: 'ROLE_USER'}],
  };
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '5m' });
}

// 통신 확인
app.get('/', (req, res) => {
  res.json('Hello')
})

// 회원가입
app.post('/sign-up', (req, res) => {
  const { username, password, nickname } = req.body;

  const user = { username, password, nickname };
  users.push(user);

  res.json({ username, nickname, authorities: [{ authorityName: 'ROLE_USER '}]});
});

app.listen(PORT, () => {
  console.log(`${PORT}번 포트로 연결되었습니다.`);
});
