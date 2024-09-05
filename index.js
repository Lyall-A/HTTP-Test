const Server = require("./http/Server.js");

const { port } = require("./config.json");

const server = new Server();
const startDate = new Date();

server.get("/", (req, res) => {
    res.json({ alive: true, started: startDate.toUTCString(), message: "I'm alive!!!" });
});

server.get("/ip", (req, res) => {
    res.json({
        ip: req.socket.remoteAddress.split("::ffff:")[1] || req.socket.remoteAddress,
        realIp: req.headers[decodeURIComponent((req.query.header || "CF-Connecting-IP").toLowerCase())] || null
    });
});

server.get("/headers", (req, res) => {
    res.json(req.headers);
});

server.get("*", (req, res) => {
    res.setStatus(404).json({ error: "404" });
});

server.listen(port, () => console.log(`Listening at :${port}`));
