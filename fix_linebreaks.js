const fs = require("fs");
const readline = require("readline");

function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function (err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames.forEach(function (filename) {
            fs.readFile(dirname + filename, "utf-8", function (err, content) {
                if (err) {
                    onError(err);
                    return;
                }
                onFileContent(filename, content);
            });
        });
    });
}

function forEachFile(filename, content) {
    console.log("\n\nReading file: " + filename);
    processContent(filename, content);
}

function handleError(err) {
    console.log(err);
}

async function processLineByLine(filename) {
    const fileStream = fs.createReadStream(filename);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in filename as a single line break.

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        console.log(`Line from file: ${line}`);
    }
}

function processContent(filename, content) {
    if (filename !== "pt_BR.js") return;

    //processLineByLine(filename);
    processLineByLine2(filename, content);
}

function processLineByLine2(filename, content) {
    let newContent = content.replace(/\n/g, "\r\n");
    console.log("sabing new file");
    fs.writeFileSync("filestofix\\" + filename + "1", newContent);
}

readFiles("filestofix\\", forEachFile, handleError);
