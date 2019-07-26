# hapi+socket.io+jwt

## 설치방법
- 저장소를 복사합니다.
- `npm i` 를 통하여 모듈을 내려 받습니다.
- `npm start` 를 통하여 서버를 시작합니다.

## 파일 설명
- router/
    - router/`_loader.js`
    > router 폴더의 라우터 파일을 호출 합니다.
    - router/`main.js`
    > main 라우터 설정 파일입니다.
    - router/`memo.js`
    > [GnuBoard cms](https://sir.kr) 에서 사용되었던 라우터 입니다.  
    > 인증은 JWT 방식을 사용 하며 secret key는 `secret.conf`에서 설정 합니다.
    - router/`test.js`
    > test 라우터 설정 파일입니다.
- index.js
> main 서버
- index.php
> jwt인증으로 memo 라우터로 curl 데이터 전송을 합니다. (http://localhost:7770/main/{user})
- JWT.php
> [PHP JWT](https://github.com/firebase/php-jwt) License: BSD3
- JWT.php.LICENSE
> JWT.php의 BSD3 라이선스 파일
- secret.conf
> JWT 비밀키

## 라우터 추가 방법
- `router/example.js` add
```
module.exports = function(name, server, io, main) {

    // 소켓
    var main = io.to('/')
    var soc = io.of('/'+name)

    // 라우트
    server.route({
        method: 'GET',
        path: '/test',
        handler: function (request, h) {

            main.emit('msg', { msg: 'test->main::메인으로 가세요' }) // main socket
            soc.emit('msg', { msg: 'test::테스트' }) // me

            return { result: true }
        }
    })
}
```

- `index.js` append
```
// rl.loader('라우터/소켓명', hapi서버, 소켓)
rl.loader('example', server, io) // router/example.js
```

## 예시
- [그누보드 5.3.x 실시간 쪽지 (nodejs)](https://sir.kr/g5_plugin/5931)
- [[그누보드 5.4.0.1] 기념 실시간 쪽지 (nodejs)](https://sir.kr/g5_plugin/5894)