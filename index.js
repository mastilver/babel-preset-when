'use strict';
module.exports = function (context, options) {
    return Object.keys(options)
        .reduce((prev, key) => {
            const config = options[key][process.env[key]];

            if (config == null) {
                return prev;
            }

            return {
                plugins: prev.plugins.concat(config.plugins),
                presets: prev.presets.concat(config.presets)
            };
        }, {
            plugins: [],
            presets: []
        });
};
