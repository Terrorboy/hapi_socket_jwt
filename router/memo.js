module.exports = function(name, server, io) {
	const jwt = require('jsonwebtoken')
	const fs = require('fs')
	const secretKey = fs.readFileSync('secret.conf', 'utf8') // 비밀키 :: secret.conf 를 수정 하세요.


	// 소켓
	const soc = io.of('/memo')
	soc.use(function(socket, next) {
		let userID = socket.handshake.query.id
		let queryData = socket.handshake.query.jwt
		let decodeToken = jwt.verify(queryData, secretKey, function(err, decoded) {
			if(err) socket.leave(userID)
			else socket.join(decoded.id)
		})
		next();
	});


	// 라우트
	server.route({
		method: 'GET',
		path: '/memo',
		handler: function (request, h) {
			return ''
		}
	})
	server.route({
		method: ['POST'],
		path: '/memo/{user}',
		handler: function (request, h) {
			var user = encodeURIComponent(request.params.user)
			var data = request.payload
			soc.in(user).emit('memo', data);
			return { result: true }
		}
	})
}
