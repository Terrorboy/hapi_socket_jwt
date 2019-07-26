module.exports = function(name, server, io) {

	console.log(name);
	// 소켓
	var soc = io.of('/')
	/*
		soc.on('connection', (socket) => {
			soc.emit('msg', '환영합니다.')
		})
	*/

	// 라우트
	server.route({
		method: 'GET',
		path: '/',
		handler: function (request, h) {

			soc.emit('msg', { msg: 'main::메인이에요!!' })
			
			//request.logger.info('In handler %s', request.path);
			return { result: true }
		}
	})
}