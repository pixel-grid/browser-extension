export default function convertStringToMediaQuery(
    source?: string
): {
    mediaQueryType: undefined | 'raw' | 'boundaries';
    mediaQueryRaw: string;
    mediaQueryFrom: string;
    mediaQueryTo: string;
} {
    if (source !== '' && source !== undefined) {
        const mediaQueryMatch = source.match(
            /^\(\s*(min|max)\-width\s*\:\s*.+?\s*\)(\s*and\s*\(\s*(min|max)\-width\s*\:\s*.+?\s*\))?/i
        );

        if (
            mediaQueryMatch &&
            mediaQueryMatch.index === 0 &&
            mediaQueryMatch[0] === mediaQueryMatch.input
        ) {
            // boundaries
            const matches = source.match(
                /(\(( )*(min|max)\-width( )*\:.+?\))/gi
            );

            if (matches) {
                const { min, max } = matches.reduce<{
                    min?: string;
                    max?: string;
                }>((result, m) => {
                    const sizeMatch = m.match(
                        /\(\s*(min|max)\-width\s*\:\s*(.+?)\s*\)/i
                    );
                    const size =
                        sizeMatch && sizeMatch.length >= 2 ? sizeMatch[2] : '';

                    if (m.indexOf('min') !== -1) {
                        return { ...result, min: size };
                    } else if (m.indexOf('max') !== -1) {
                        return { ...result, max: size };
                    }

                    return result;
                }, {});

                return {
                    mediaQueryType: 'boundaries',
                    mediaQueryRaw: '',
                    mediaQueryFrom: min !== undefined ? min : '',
                    mediaQueryTo: max !== undefined ? max : ''
                };
            } else {
                return {
                    mediaQueryType: 'raw',
                    mediaQueryRaw: source,
                    mediaQueryFrom: '',
                    mediaQueryTo: ''
                };
            }
        } else {
            // raw
            return {
                mediaQueryType: 'raw',
                mediaQueryRaw: source,
                mediaQueryFrom: '',
                mediaQueryTo: ''
            };
        }
    } else {
        return {
            mediaQueryType: 'boundaries',
            mediaQueryRaw: '',
            mediaQueryFrom: '',
            mediaQueryTo: ''
        };
    }
}
