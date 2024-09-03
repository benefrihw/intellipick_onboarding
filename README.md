# [한 달 인턴]Preonboarding Backend Course(Node.js)
## Requirements
---
- [ ]  Jest를 이용한 테스트 코드 작성법 이해
- [ ]  Express.js와 Middleware에 대한 이해
- [ ]  JWT와 구체적인 알고리즘의 이해
- [ ]  리뷰 바탕으로 개선하기
- [ ]  EC2에 배포해보기

### 시나리오 설계 및 코딩 시작!
**Express.js와 Middleware 기본 이해**
- [ ]  Middleware란 무엇인가?(with Interceptor, AOP)
- [ ]  Express.js란?

**JWT 기본 이해**
- [ ]  JWT란 무엇인가요?

**토큰 발행과 유효성 확인**
- [ ]  Access / Refresh Token 발행과 검증에 관한 **테스트 시나리오** 작성하기

**유닛 테스트 작성**
- [ ]  Jest를 이용한 JWT Unit 테스트 코드 작성해보기    
    https://jestjs.io/    
    https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai
    

### 백엔드 배포하기
**테스트 완성**
- [ ]  백엔드 유닛 테스트 완성하기

**로직 작성**
- [ ]  백엔드 로직을 Express.js로
- [ ]  회원가입 - /signup
    - [ ]  Request Message        
        ```json
        json코드 복사
        {
        	"username": "JIN HO",
        	"password": "12341234",
        	"nickname": "Mentos"
        }
        
        ```
        
    - [ ]  Response Message        
        ```json
        json코드 복사
        {
        	"username": "JIN HO",
        	"nickname": "Mentos",
        	"authorities": [
        			{
        					"authorityName": "ROLE_USER"
        			}
        	]
        }
        
        ```
        
- [ ]  로그인 - /login
    - [ ]  Request Message        
        ```json
        json코드 복사
        {
        	"username": "JIN HO",
        	"password": "12341234"
        }
        
        ```
        
    - [ ]  Response Message        
        ```json
        json코드 복사
        {
        	"token": "eKDIkdfjoakIdkfjpekdkcjdkoIOdjOKJDFOlLDKFJKL",
        }
        
        ```
        

**배포해보기**
- [ ]  AWS EC2에 배포하기

**API 접근과 검증**
- [ ]  Swagger UI로 접속 가능하게 하기

### 백엔드 개선하기
[Git 커밋 메시지 잘 쓰는 법 | GeekNews](https://news.hada.io/topic?id=9178&utm_source=slack&utm_medium=bot&utm_campaign=TQ595477U)

**AI-assisted programming**
- [ ]  AI에게 코드리뷰 받아보기

**Refactoring**
- [ ]  피드백 받아서 코드 개선하기

**마무리**
- [ ]  AWS EC2 재배포하기

**최종**
- [ ]  인텔리픽 과제/코테 코칭 신청하기

### 4. Github에 프로젝트 푸시

### 5. AWS EC2 배포
1. EC2 인스턴스 생성 및 설정
2. Node.js 및 필요한 패키지 설치
3. 프로젝트 클론 및 서버 실행

### 6. Swagger UI 설정

### 7. 개선 및 재배포
피드백을 반영한 코드 수정 후 EC2에 재배포.

### 8. 최종 제출
인텔리픽 과제/코테 코칭 신청하기.
