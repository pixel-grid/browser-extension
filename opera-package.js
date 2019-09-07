const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const { zip } = require('zip-a-folder');

const buildPath = path.resolve('build');
const packagePath = path.resolve('package/opera');
const packageFilePath = path.resolve('package/opera/pixelgrid.zip');

start()
    .then(() => {
        console.log('Done');
    })
    .catch((e) => {
        console.log('Error during packaging Opera extension.');
        console.error(e);
    });

async function start() {
    // Cleanup

    rimraf.sync(packagePath);

    if (!fs.existsSync(path.resolve('package'))) {
        fs.mkdirSync(path.resolve('package'));
    }

    if (!fs.existsSync(path.resolve('package/opera'))) {
        fs.mkdirSync(path.resolve('package/opera'));
    }

    // Create package

    await zip(buildPath, packageFilePath);

    // Result
    console.log(`Final package: ${packageFilePath}`);
}
