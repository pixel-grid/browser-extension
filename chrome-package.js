const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const { zip } = require('zip-a-folder');

const buildPath = path.resolve('build');
const packagePath = path.resolve('package/chrome');
const packageFilePath = path.resolve('package/chrome/pixelgrid.zip');

start()
    .then(() => {
        console.log('Done');
    })
    .catch((e) => {
        console.log('Error during packaging Chrome extension.');
        console.error(e);
    });

async function start() {
    // Cleanup

    rimraf.sync(packagePath);

    if (!fs.existsSync(path.resolve('package'))) {
        fs.mkdirSync(path.resolve('package'));
    }

    if (!fs.existsSync(path.resolve('package/chrome'))) {
        fs.mkdirSync(path.resolve('package/chrome'));
    }

    // Create package

    await zip(buildPath, packageFilePath);

    // Result
    console.log(`Final package: ${packageFilePath}`);
}
