const socketIO = require('socket.io')

module.exports = server => {

	const io = socketIO.listen(server);

	io.sockets.on('connection', socket => {
		socket.on('newMsg', data => {
			console.log('newMsg:',data)
			socket.broadcast.emit('refreshMsg',data)
		})
	});

}