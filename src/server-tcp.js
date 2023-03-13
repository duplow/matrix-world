const net = require('net');

const sockets = [];

const server = net.createServer(function(socket) {
	socket.write('Welcome to server\r\n');
	socket.pipe(socket);

  socket.on('error', () => {
    console.log('Client disconnect')
    socket.destroy(); // TODO: Remove from sockets
  })

  socket.on('data', (data) => {
    console.log(`Server received: ${data}`)
  })

  sockets.push(socket)
});

server.broadcast = (data) => {
  sockets.forEach((socket) => {
    socket.write(data)
  })
}

server.on('data', (data) => {
  console.log(`Server received: ${data}`)
})

server.on('error', () => {
  console.log('Server error')
})

server.listen(1337, '127.0.0.1', () => {
  console.log('Server listen at 1337')
});

setInterval(() => {
  server.broadcast('5s passed!')
}, 5000)
