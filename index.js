'use strict';
module.exports = function (context, options) {
    return Object.keys(options)
        .reduce((prev, key) => {
            const splittedKey = key.split('=');

            const envVarName = splittedKey[0];
            const defaultValue = splittedKey[1];

            let config = options[key][process.env[envVarName]];

            if (config == null) {
                config = defaultValue;
                if (config == null) {
                    return prev;
                }
            }

            return {
                plugins: prev.plugins.concat(config.plugins || []),
                presets: prev.presets.concat(config.presets || [])
            };
        }, {
            plugins: [],
            presets: []
        });
};
