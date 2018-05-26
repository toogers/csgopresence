const client = require("discord-rich-presence")("423856039071449088");
const http = require("http");
const fs = require("fs");
const port = "4899";
const host = "127.0.0.1";
const g894 = Math.floor(Math.random() * Math.floor(133769));

server = http.createServer(function(req, res) {
	if (req.method == "POST") {
		console.log("Handling POST request...");
		res.writeHead(200, {"Content-Type": "text/html"});

		var body = "";
		req.on("data", function (data) {
			body += data;
		});
		req.on("end", function () {
			console.log("POST payload: " + body);
			if (body == "stop_cg894" + g894) {
				console.log("Exiting.");
				res.end('{"success":true}');
				process.exit();
			}
			res.end("");
			console.log("updated");
			updatePresence(body);
		});
	} else {
		res.writeHead(200, {"Content-Type": "text/html"});
		fs.readFile("default.html", "utf8", function(err, data) {
			if (err) {
				res.end("<html><body>report this error on <a href='https://github.com/toogers/csgopresence'>github</a></body></html>");
			} else {
				res.end(data.replace("%g894", g894));
			}
		});
	}
}).listen(port, host);
console.log("Listening at http://" + host + ":" + port);

function updatePresence(jsonstr) {
	const json = JSON.parse(jsonstr);
	let state = "None";
	let details = "None";
	let largeImageKey = "None";
	let smallImageKey = "None";

	if (json.player.activity == "menu") {
		state = "In the menus.";
		largeImageKey = "csgo";
		smallImageKey = "tct";
	} else if (json.player.activity == "playing") {
		state = `[${json.player.clan}] ${json.player.name} is playing ${fixStr(json.map.mode)} on ${fixStr(json.map.name.split("_")[1])}`;
		details = `Score: ${json.player.match_stats.score}`;
		largeImageKey = "csgo";
		smallImageKey = json.map.name;
	} else if (json.player.activity == "textinput") {
		state = "Typing...";
		largeImageKey = "csgo";
		smallImageKey = "tct";
	} else {
		state = "In an unknown place!";
		largeImageKey = "csgo";
		smallImageKey = "tct";
	}

	client.updatePresence({
		state: state,
		details: details,
		largeImageKey: largeImageKey,
		smallImageKey: smallImageKey,
		instance: true,
	});
}

function fixStr(string) {
    return (string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()).replace("_", " ");
}
