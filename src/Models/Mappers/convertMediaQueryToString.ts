export default function convertMediaQueryToString(
    type: undefined | 'raw' | 'boundaries',
    data: {
        mediaQueryRaw?: string;
        mediaQueryFrom?: string;
        mediaQueryTo?: string;
    }
): string {
    const { mediaQueryRaw, mediaQueryFrom, mediaQueryTo } = data;

    if (type === 'raw') {
        return mediaQueryRaw || '';
    } else if (type === 'boundaries') {
        const result = [];

        if (!!mediaQueryFrom) {
            result.push(`(min-width: ${mediaQueryFrom})`);
        }
        if (!!mediaQueryTo) {
            result.push(`(max-width: ${mediaQueryTo})`);
        }

        return result.join(' and ');
    } else {
        return '';
    }
}
