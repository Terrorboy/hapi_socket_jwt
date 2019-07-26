const Hapi = require('hapi')
const SocketIO = require('socket.io')
const server = Hapi.server({ port: 7770 })

const init = async () => {

	// SocketIO 생성
	const io = SocketIO.listen(server.listener)

	// 라우터
	var rl = require('./router/_loader.js')
	rl.loader('main', server, io) // router/main.js
	rl.loader('test', server, io) // router/test.js
	rl.loader('memo', server, io) // router/memo.js



	// 서버시작
	await server.start()
	console.log(`Server running at: ${server.info.uri}`)

	// Request 로거
	/*
		await server.register({
			plugin: require('hapi-pino'), // npm i hapi-pino --save
			options: {
				prettyPrint: false,
				logEvents: ['response', 'onPostStart']
			}
		})
	*/
}

process.on('unhandledRejection', (err) => {
	console.log(err)
	process.exit(1)
})
init()