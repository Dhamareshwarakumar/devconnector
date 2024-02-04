const { URL } = require('url');

const validateUrl = (url, protocols = ['http', 'https']) => {
    try {
        newUrl = new URL(url);
        return protocols
            ? newUrl.protocol
                ? protocols.map(protocol => `${protocol.toLowerCase()}:`).includes(newUrl.protocol)
                : false
            : true;
    } catch (err) {
        return false;
    }
}

const isEmpty = (value) => value === undefined || value === null || typeof value === 'object' && Object.keys(value).length === 0 || typeof value === 'string' && value.trim().length === 0;

module.exports = {
    validateUrl,
    isEmpty
}