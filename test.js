import test from 'ava';
import fn from './';

test('basic', t => {
    process.env.BABEL_TEST_1 = 'true';

    t.deepEqual(fn(null, {
        BABEL_TEST_1: {
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
    process.env.BABEL_TEST_2 = 'true';
    process.env.BABEL_TEST_3 = 'true';

    t.deepEqual(fn(null, {
        BABEL_TEST_2: {
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
        BABEL_TEST_3: {
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
