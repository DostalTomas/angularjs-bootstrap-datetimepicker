const path = require('path');

const isDebugging = (() => {
    const TCPWrap = process.binding('tcp_wrap');
    const {TCP} = TCPWrap;
    const tcp = new TCP(TCPWrap.constants.SERVER);
    let error;

    function doBind() {
        let err = tcp.bind6('::', process.debugPort);
        if (err) {
            err = tcp.bind('0.0.0.0', process.debugPort);
        }

        return err;
    }

    doBind();

    error = doBind();

    if (error) {
        tcp.close();
        return false;
    }

    return true;
})();

module.exports = (config) => {
    config.set({
        basePath: path.resolve(__dirname, '..'),

        frameworks: ['jasmine'],

        files: [
            path.resolve(__dirname, '..', 'node_modules', 'angular', 'angular.js'),
            path.resolve(__dirname, '..', 'node_modules', 'angular-mocks', 'angular-mocks.js'),
            './src/**/*.spec.ts'
        ],

        preprocessors: {
            '**/*.ts': ['webpack', 'sourcemap']
        },

        plugins: [
            require('karma-webpack'),
            require('karma-jasmine'),
            require('karma-spec-reporter'),
            require('karma-source-map-support'),
            require('karma-sourcemap-loader'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-chrome-launcher')
        ],

        browsers: [isDebugging ? 'ChromiumNoSandbox' : 'ChromiumHeadlessNoSandbox'],

        customLaunchers: {
            'ChromiumHeadlessNoSandbox': {
                base: 'ChromiumHeadless',
                flags: [
                    '--disable-gpu',
                    '--no-sandbox'
                ],
                debug: true
            },
            'ChromiumNoSandbox': {
                base: 'Chromium',
                flags: [
                    '--disable-gpu'
                ],
                debug: true
            }
        },

        singleRun: !isDebugging,

        reporters: ['spec', 'coverage-istanbul'],

        webpack: require('./webpack.test.config'),

        webpackMiddleware: {
            stats: 'errors-only'
        },

        coverageIstanbulReporter: {
            reports: ['text-summary', 'html'],
            dir: path.resolve(__dirname, '..', 'reports', 'coverage'),
            fixWebpackSourcePaths: true,
            combineBrowserReports: true,
            'es-modules': true,
            thresholds: {
                emitWarning: false,

                global: {
                    statements: 0,
                    lines: 0,
                    branches: 0,
                    functions: 0
                }
            }
        }
    });
};
