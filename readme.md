# babel-preset-when [![Build Status](https://travis-ci.org/mastilver/babel-preset-when.svg?branch=master)](https://travis-ci.org/mastilver/babel-preset-when)

> Conditional babel preset


## Install

```
$ npm install --save babel-preset-when
```


## Usage

### Via .babelrc (Recommended)

.babelrc

```js
{
  "presets": [
    "when": {
        "IS_SERVER": {
            "true": {
                "presets": ["es2015-node"]
            },
            "false": {
                "presets": ["es2015"]
            }
        },
        "NODE_ENV=development": {
            "development": {
                plugins: ["rewire"]
            }
        }
    }
  ]
}
```

Running: `IS_SERVER=true babel src`
will use `es-2015-node` rather than `es2015` and `rewire` as the default


## License

MIT © [Thomas Sileghem](http://mastilver.com)
