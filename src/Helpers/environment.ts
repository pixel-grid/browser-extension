export function isFirefox() {
    return process.env.TARGET === 'firefox';
}

export function isOpera() {
    return process.env.TARGET === 'opera';
}

export function isEdge() {
    return process.env.TARGET === 'edge';
}

export function resolveAssetUrl(url: string): string {
    return `/${url}`;
}
