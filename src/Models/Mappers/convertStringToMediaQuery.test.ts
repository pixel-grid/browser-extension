import convertStringToMediaQuery from './convertStringToMediaQuery';

test('empty source returns boundary type', () => {
    const result = convertStringToMediaQuery('');

    expect(result.mediaQueryType).toBe('boundaries');
    expect(result.mediaQueryRaw).toBe('');
    expect(result.mediaQueryFrom).toBe('');
    expect(result.mediaQueryTo).toBe('');
});

test('undefined source returns boundary type', () => {
    const result = convertStringToMediaQuery(undefined);

    expect(result.mediaQueryType).toBe('boundaries');
    expect(result.mediaQueryRaw).toBe('');
    expect(result.mediaQueryFrom).toBe('');
    expect(result.mediaQueryTo).toBe('');
});

test('matched boundaries pattern (both values)', () => {
    const result = convertStringToMediaQuery(
        '(min-width: 84rem) and (max-width: 94.99rem)'
    );

    expect(result.mediaQueryType).toBe('boundaries');
    expect(result.mediaQueryRaw).toBe('');
    expect(result.mediaQueryFrom).toBe('84rem');
    expect(result.mediaQueryTo).toBe('94.99rem');
});

test('matched boundaries pattern (min value)', () => {
    const result = convertStringToMediaQuery('(min-width: 84rem)');

    expect(result.mediaQueryType).toBe('boundaries');
    expect(result.mediaQueryRaw).toBe('');
    expect(result.mediaQueryFrom).toBe('84rem');
    expect(result.mediaQueryTo).toBe('');
});

test('matched boundaries pattern (max value)', () => {
    const result = convertStringToMediaQuery('(max-width: 94.99rem)');

    expect(result.mediaQueryType).toBe('boundaries');
    expect(result.mediaQueryRaw).toBe('');
    expect(result.mediaQueryFrom).toBe('');
    expect(result.mediaQueryTo).toBe('94.99rem');
});

test('matched raw pattern (with screen)', () => {
    const result = convertStringToMediaQuery(
        'screen and (max-width: 94.99rem)'
    );

    expect(result.mediaQueryType).toBe('raw');
    expect(result.mediaQueryRaw).toBe('screen and (max-width: 94.99rem)');
    expect(result.mediaQueryFrom).toBe('');
    expect(result.mediaQueryTo).toBe('');
});

test('matched raw pattern (with few values)', () => {
    const result = convertStringToMediaQuery(
        '(min-width: 64rem) and (min-width: 84rem) and (max-width: 94.99rem)'
    );

    expect(result.mediaQueryType).toBe('raw');
    expect(result.mediaQueryRaw).toBe(
        '(min-width: 64rem) and (min-width: 84rem) and (max-width: 94.99rem)'
    );
    expect(result.mediaQueryFrom).toBe('');
    expect(result.mediaQueryTo).toBe('');
});
