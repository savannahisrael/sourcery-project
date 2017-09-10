const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// API Routes
// =============================================================
app.get("/api/test", (req, res) => res.json({id:1, first:'hello', last:'world'}));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});


// Starts the server to begin listening
// =============================================================
const server = app.listen(port, () => console.log("App listening on PORT " + port));
const io = require('socket.io').listen(server);

io.sockets.on('connection', socket => {
	console.log('A user connected...');
	socket.on('disconnect', () => console.log('A user disconnected.'));
	})
});