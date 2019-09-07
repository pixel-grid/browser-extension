const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const { zip } = require('zip-a-folder');

const buildPath = path.resolve('build');
const packagePath = path.resolve('package/firefox');
const packageFilePath = path.resolve('package/firefox/pixelgrid.zip');

start()
    .then(() => {
        console.log('Done');
    })
    .catch((e) => {
        console.log('Error during packaging Firefox extension.');
        console.error(e);
    });

async function start() {
    // Cleanup

    rimraf.sync(packagePath);

    if (!fs.existsSync(path.resolve('package'))) {
        fs.mkdirSync(path.resolve('package'));
    }

    if (!fs.existsSync(path.resolve('package/firefox'))) {
        fs.mkdirSync(path.resolve('package/firefox'));
    }

    // Create package

    await zip(buildPath, packageFilePath);

    // Result
    console.log(`Final package: ${packageFilePath}`);
}
