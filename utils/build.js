import archiver from "archiver";
import fs from "fs";
import fss from "fs/promises";
import { rimraf } from "rimraf";
import { minify } from 'minify';

const buildTmp = "./.sounddark_build_tmp",
    sourcePath = "./src",
    distPath = "./dist",
    firefoxGekkoId = "sounddark@michioxd.github.io",
    minifyOptions = {
        "js": {
            "mangle": true,
            "mangleClassName": true,
            "removeUnusedVariables": true,
            "removeConsole": false,
            "removeUselessSpread": true
        },
        "css": {
            "compatibility": "*"
        }
    };

console.log("SoundDark extension builder");

if (fs.existsSync(distPath)) {
    await fss.rm(distPath, {
        recursive: true
    });
}

await fss.mkdir(distPath);

// Generate build folder
if (fs.existsSync(buildTmp)) rimraf.sync(buildTmp);

fs.cpSync(sourcePath, buildTmp, {
    recursive: true,
});

if (!fs.existsSync(buildTmp)) {
    console.error("ERROR: Temporary folder not found!");
    process.exit();
}

// Minify JS and CSS
try {
    const minifier = await Promise.all([
        minify(buildTmp + '/sounddark.css', minifyOptions),
        minify(buildTmp + '/sounddark.js', minifyOptions)
    ]);

    await Promise.all([
        fss.writeFile(buildTmp + '/sounddark.css', minifier[0]),
        fss.writeFile(buildTmp + '/sounddark.js', minifier[1])
    ]);
} catch (e) {
    console.error(e);
    process.exit(1);
}

const output_chromium = fs.createWriteStream(distPath + "/chromium-release.zip");
const archive_chromium = archiver("zip", {
    zlib: { level: 9 }
});

archive_chromium.on('warning', function (err) {
    console.warn(err);
});

archive_chromium.on('error', function (err) {
    console.error(err);
});

archive_chromium.pipe(output_chromium);

archive_chromium.directory(buildTmp, "");

await archive_chromium.finalize();
console.log("OK Chromium");

try {
    console.log("Generating Firefox extension...");
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
    process.exit(1);
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
    process.exit(1);
});

archive.pipe(output);

archive.directory(buildTmp, "");

await archive.finalize();

rimraf.sync(buildTmp);
console.log("Done!");