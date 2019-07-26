module.exports = function(name, server, io, main) {

	// 소켓
	var main = io.to('/')
	var soc = io.of('/'+name)

	// 라우트
	server.route({
		method: 'GET',
		path: '/test',
		handler: function (request, h) {

			main.emit('msg', { msg: 'test->main::메인으로 가세요' })
			soc.emit('msg', { msg: 'test::테스트' })

			//request.logger.info('In handler %s', request.path);
			return { result: true }
		}
	})
}