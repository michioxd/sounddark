import archiver from "archiver";
import fs from "fs";
import fss from "fs/promises";
import ChromeExtension from "crx";
import path from "path";
import { rimraf } from "rimraf";

const buildTmp = "./.sounddark_build_tmp",
    sourcePath = "./src",
    distPath = "./dist",
    firefoxGekkoId = "sounddark@michioxd.github.io";

console.log("SoundDark extension builder");

if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
} else {
    const files = fs.readdirSync(distPath);
    for (const file of files) {
        fs.unlinkSync(path.join(distPath, file));
    }
}

// For Chromium
const crx = new ChromeExtension({
    privateKey: fs.readFileSync('./key.pem')
});

const mainExt = await crx.load(sourcePath);

const extPacked = await mainExt.pack();
fs.writeFileSync(distPath + '/chromium-release.zip', extPacked);
console.log("OK Chromium");

// For Firefox
if (fs.existsSync(buildTmp)) rimraf.sync(buildTmp);

fs.cpSync(sourcePath, buildTmp, {
    recursive: true,
});

if (!fs.existsSync(buildTmp)) {
    console.error("ERROR: Temporary folder not found!");
    process.exit();
}

try {
    const manifest = await fss.readFile(buildTmp + "/manifest.json", 'utf8');

    const mainfestData = JSON.parse(manifest);

    mainfestData.browser_specific_settings = {
        gecko: {
            id: firefoxGekkoId
        }
    };

    const updatedData = JSON.stringify(mainfestData, null, 2);

    await fss.writeFile(buildTmp + "/manifest.json", updatedData);

} catch (e) {
    console.error(e);
    process.exit();
}

const output = fs.createWriteStream(distPath + "/firefox-release.zip");
const archive = archiver("zip", {
    zlib: { level: 9 }
});

archive.on('warning', function (err) {
    console.warn(err);
});

archive.on('error', function (err) {
    console.error(err);
});

archive.pipe(output);

archive.directory(buildTmp, "");

await archive.finalize();

rimraf.sync(buildTmp);

console.log("Done!");