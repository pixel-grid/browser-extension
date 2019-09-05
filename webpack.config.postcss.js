module.exports = [
    require('postcss-map')({
        basePath: 'src/',
        maps: ['_variables/colors.yml', '_variables/fonts.yml']
    }),
    require('postcss-assets'),
    require('postcss-import')({
        root: 'src'
    }),
    require('postcss-nested-ancestors'),
    require('postcss-nested'),
    require('postcss-custom-properties')({
        preserve: false,
        importFrom: 'src/'
    }),
    require('postcss-calc'),
    require('postcss-color-function'),
    require('postcss-custom-media')({
        importFrom: {
            customMedia: {
                '--screen-xs': 'screen and (max-width: 19.99rem)',
                '--screen-sm':
                    'screen and (min-width: 20rem) and (max-width: 39.99rem)',
                '--screen-md':
                    'screen and (min-width: 40rem) and (max-width: 83.99rem)',
                '--screen-lg': 'screen and (min-width: 84rem)',
                '--screen-md-to-lg': 'screen and (min-width: 40rem)',
                '--screen-xs-to-md': 'screen and (max-width: 83.99rem)',
                '--screen-xs-to-sm': 'screen and (max-width: 39.99rem)'
            }
        }
    }),
    require('postcss-mq-optimize'),
    require('postcss-pxtorem')({
        rootValue: 16,
        replace: false,
        mediaQuery: true
    }),
    require('postcss-focus'),
    require('autoprefixer')
];
