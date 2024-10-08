const Server = require("./http/Server.js");

const { port, forceRealIp, realIpHeader, forceRealIpHeader } = require("./config.json");

const server = new Server();
const startDate = new Date();

server.get("/", (req, res) => {
    res.json({ alive: true, started: startDate.toUTCString(), message: "I'm alive!!!" });
});

server.get("/ip", (req, res) => {
    const ip = req.socket.remoteAddress.split("::ffff:")[1] || req.socket.remoteAddress;
    const realIp = req.headers[decodeURIComponent((forceRealIpHeader || realIpHeader || req.query.header).toLowerCase())];
    res.json({
        ip: realIp || (!forceRealIp ? ip : null)
    });
});

server.get("/headers", (req, res) => {
    res.json(req.headers);
});

server.any("*", (req, res) => {
    res.setStatus(404).json({ error: "404" });
});

server.listen(port, () => console.log(`Listening at :${port}`));
