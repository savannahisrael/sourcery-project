const socketIO = require('socket.io');

module.exports = server => {

	const io = socketIO.listen(server);

	io.sockets.on('connection', socket => {
		socket.on('join', room => {
			// console.log('Room joined:', room);
			socket.room = room;
		    socket.join(room);
		});

		socket.on('leave', room => {
			// console.log('Room left:', room);
			socket.room = '';
			socket.leave(room);
		})

		socket.on('newMsg', data => {
			// console.log('newMsg:',socket.room, data)
			io.to(socket.room).emit('refreshMsg',data)
		});


	});

};