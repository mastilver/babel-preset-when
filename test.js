import test from 'ava';
import cuid from 'cuid';

import fn from './';

test('basic', t => {
    const envVarName = cuid();

    process.env[envVarName] = 'true';

    t.deepEqual(fn(null, {
        [envVarName]: {
            true: {
                plugins: [
                    'transform-runtime',
                    'transform-es2015-classes'
                ],
                presets: [
                    'es2015'
                ]
            }
        }
    }), {
        plugins: [
            'transform-runtime',
            'transform-es2015-classes'
        ],
        presets: [
            'es2015'
        ]
    });
});

test('combine', t => {
    const envVarName1 = cuid();
    const envVarName2 = cuid();

    process.env[envVarName1] = 'true';
    process.env[envVarName2] = 'true';

    t.deepEqual(fn(null, {
        [envVarName1]: {
            true: {
                plugins: [
                    'transform-runtime',
                    'transform-es2015-classes'
                ],
                presets: [
                    'es2015'
                ]
            }
        },
        [envVarName2]: {
            true: {
                plugins: [
                    'es3-member-expression-literals',
                    'es3-property-literals'
                ],
                presets: [
                    'es2017',
                    'es2016'
                ]
            }
        }
    }), {
        plugins: [
            'transform-runtime',
            'transform-es2015-classes',
            'es3-member-expression-literals',
            'es3-property-literals'
        ],
        presets: [
            'es2015',
            'es2017',
            'es2016'
        ]
    });
});

test('when given no values', t => {
    const envVarName = cuid();

    process.env[envVarName] = 'true';

    t.deepEqual(fn(null, {
        [envVarName]: {
            true: {}
        }
    }), {
        plugins: [],
        presets: []
    });
});

test('when giving options to preset', t => {
    const envVarName = cuid();

    process.env[envVarName] = 'true';

    t.deepEqual(fn(null, {
        [envVarName]: {
            true: {
                presets: [
                    ['es2015', {modules: false}]
                ]
            }
        }
    }), {
        plugins: [],
        presets: [
            ['es2015', {modules: false}]
        ]
    });
});

test('using defaults', t => {
    const envVarName1 = cuid();
    const envVarName2 = cuid();

    t.deepEqual(fn(null, {
        [`${envVarName1}=true`]: {
            true: {
                presets: [
                    ['es2015', {modules: false}]
                ]
            }
        },
        [`${envVarName2}=false`]: {
            true: {
                presets: [
                    'es2016'
                ]
            }
        }
    }), {
        plugins: [],
        presets: [
            ['es2015', {modules: false}]
        ]
    });
});

test('when env variables not set', t => {
    const envVarName = cuid();

    t.deepEqual(fn(null, {
        [envVarName]: {
            true: {
                presets: [
                    'es2015'
                ]
            }
        }
    }), {
        plugins: [],
        presets: []
    });
});
