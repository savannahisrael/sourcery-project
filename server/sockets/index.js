const socketIO = require('socket.io')

module.exports = server => {

	const io = socketIO.listen(server);

	io.sockets.on('connection', socket => {
		console.log('A user connected...');
		socket.on('disconnect', () => console.log('A user disconnected.'));
		socket.on('newMsg', data => {
			console.log(data)
		})
	});



}