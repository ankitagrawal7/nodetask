const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require("cors");
const path = require("path");
require("./db");

app.use(express.json());
app.use(cors());
app.use("/auth", require("./routes/authentication"));
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send('Hello world!');
});

const server = http.listen(port, () => {
    console.log(`listening on *: ${port}`);
});

io.sockets.on('connection', function (socket) {

    socket.on('message', function (message) {
        io.emit('message', message);
    });

});