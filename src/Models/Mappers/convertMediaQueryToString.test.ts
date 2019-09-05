import convertMediaQueryToString from './convertMediaQueryToString';

test('undefined type returns empty media query', () => {
    const result = convertMediaQueryToString(undefined, {});

    expect(result).toBe('');
});

test('convert raw media query', () => {
    const source = '(min-width: 84rem) and (max-width: 94.99rem)';

    const result = convertMediaQueryToString('raw', {
        mediaQueryRaw: source
    });

    expect(result).toBe(source);
});

test('convert raw media query (undefined source)', () => {
    const result = convertMediaQueryToString('raw', {
        mediaQueryRaw: undefined
    });

    expect(result).toBe('');
});

test('convert boundaries media query (both values)', () => {
    const result = convertMediaQueryToString('boundaries', {
        mediaQueryFrom: '84rem',
        mediaQueryTo: '94.99rem'
    });

    expect(result).toBe('(min-width: 84rem) and (max-width: 94.99rem)');
});

test('convert boundaries media query (min value)', () => {
    const result = convertMediaQueryToString('boundaries', {
        mediaQueryFrom: '84rem'
    });

    expect(result).toBe('(min-width: 84rem)');
});

test('convert boundaries media query (max value)', () => {
    const result = convertMediaQueryToString('boundaries', {
        mediaQueryTo: '94.99rem'
    });

    expect(result).toBe('(max-width: 94.99rem)');
});
