import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

io.on("connection", function(socket) {
    socket.on("send-location",function(data){
        io.emit("receive-location",{id:socket.id,...data});
    })
    console.log("connected");
});

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
