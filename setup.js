const readline = require("readline");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
console.log("Where is your Counter-Strike: Global Offensive install directory?");
rl.question("eg. '/home/user/.steam/steam/steamapps/common/Counter-Strike Global Offensive' on Linux\n" +
	"or 'C:\\Program Files\\Steam\\steamapps\\common\\Counter-Strike Global Offensive' on Windows: ", (answer) => {
		copyFile("gamestate_integration_csgopresence.cfg", path.join(
			answer,
			"csgo/cfg/gamestate_integration_csgopresence.cfg"
			));
		rl.close();
	});

function copyFile(src, dest) {
	let readStream = fs.createReadStream(src);

	readStream.once("error", (err) => {
		console.log("Error copying file: " + err);
	});

	readStream.once("end", () => {
		console.log("done copying");
	});

	readStream.pipe(fs.createWriteStream(dest));
}
