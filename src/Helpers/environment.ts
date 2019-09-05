export function isOpera() {
    return process.env.TARGET === 'opera';
}

export function isYandex() {
    return process.env.TARGET === 'yandex';
}

export function isEdge() {
    return process.env.TARGET === 'edge';
}

export function isSafari() {
    return process.env.TARGET === 'safari';
}

function getSafariBasePath() {
    if (getSafariBasePath.prototype.result !== undefined) {
        return getSafariBasePath.prototype.result;
    } else {
        const match = document.location.pathname.match(/[\\\/](.+?)[\\\/]/gi);
        if (match && match.length > 0) {
            getSafariBasePath.prototype.result = match[0];
            return getSafariBasePath.prototype.result;
        }
        return '';
    }
}

export function resolveAssetUrl(url: string): string {
    if (!isSafari()) {
        return `/${url}`;
    } else {
        const basePath = getSafariBasePath();

        if (!!basePath) {
            return `${basePath}/${url}`.replace(/[\\\/]+/gi, '/');
        } else {
            return url;
        }
    }
}
