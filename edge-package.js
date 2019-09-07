const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const { exec } = require('child_process');

const manifold = path.resolve('node_modules/.bin/manifoldjs');
const manifestPath = path.resolve('build/manifest.json');
const identityFilePath = path.resolve('.edgepackagerc');
const manifoldManifestPath = path.resolve('PixelGrid/edgeextension/manifest/');
const manifoldAppManifestPath = path.resolve(
    'PixelGrid/edgeextension/manifest/appxmanifest.xml'
);

start()
    .then(() => {
        console.log('Done');
    })
    .catch((e) => {
        console.log('Error during packaging Edge extension.');
        console.error(e);
    });

async function start() {
    // https://docs.microsoft.com/en-us/microsoft-edge/extensions/guides/packaging/using-manifoldjs-to-package-extensions

    if (!fs.existsSync(identityFilePath)) {
        throw new Error('ERROR: .edgepackagerc does not exist');
    }

    // Cleanup

    rimraf.sync(path.resolve('PixelGrid'));
    rimraf.sync(path.resolve('build-appx'));
    rimraf.sync(path.resolve('package/edge'));

    // Prepare package

    await run(
        `${manifold} -l debug -p edgeextension -f edgeextension -m ${manifestPath}`
    );

    // Update manifest with actual identifier data

    replaceManifestIdentity(
        manifoldAppManifestPath,
        JSON.parse(fs.readFileSync(identityFilePath, 'utf-8'))
    );

    // Copy images

    fs.copyFileSync(
        path.resolve('assets/pixelgrid-edge-44x44.png'),
        path.resolve(
            'PixelGrid/edgeextension/manifest/Assets/Square44x44Logo.png'
        )
    );
    fs.copyFileSync(
        path.resolve('assets/pixelgrid-edge-150x150.png'),
        path.resolve(
            'PixelGrid/edgeextension/manifest/Assets/Square150x150Logo.png'
        )
    );
    fs.copyFileSync(
        path.resolve('assets/pixelgrid-edge-store.png'),
        path.resolve('PixelGrid/edgeextension/manifest/Assets/StoreLogo.png')
    );

    // Build package with Microsoft cloud service

    await run(
        `${manifold} -l debug -p edgeextension package ${manifoldManifestPath}`
    );

    // Copy result to package directory

    if (!fs.existsSync(path.resolve('package'))) {
        fs.mkdirSync(path.resolve('package'));
    }

    if (!fs.existsSync(path.resolve('package/edge'))) {
        fs.mkdirSync(path.resolve('package/edge'));
    }

    fs.copyFileSync(
        path.resolve('PixelGrid/edgeextension/manifest/appxmanifest.xml'),
        path.resolve('package/edge/pixelgrid.appx')
    );

    // Cleanup

    rimraf.sync(path.resolve('PixelGrid'));
    rimraf.sync(path.resolve('build-appx'));
}

function run(command, callback) {
    return new Promise((resolve, reject) => {
        exec(command, function(error, stdout, stderr) {
            if (error) {
                console.log(error.stack);
                console.log('Error code: ' + error.code);
                console.log('Signal received: ' + error.signal);
                console.log(stdout);
                console.log(stderr);

                reject();
            } else {
                console.log(stdout);
                console.log(stderr);

                resolve();
            }
        });
    });
}

function replaceManifestIdentity(path, values) {
    const data = fs
        .readFileSync(path, 'utf-8')
        .replace(
            'INSERT-YOUR-PACKAGE-IDENTITY-NAME-HERE',
            values.packageIdentityName
        )
        .replace(
            'CN=INSERT-YOUR-PACKAGE-IDENTITY-PUBLISHER-HERE',
            values.packageIdentityPublisher
        )
        .replace(
            'INSERT-YOUR-PACKAGE-PROPERTIES-PUBLISHERDISPLAYNAME-HERE',
            values.publisherDisplayName
        );

    fs.writeFileSync(path, data);
}
