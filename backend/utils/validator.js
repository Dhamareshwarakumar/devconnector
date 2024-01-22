const { URL } = require('url');

exports.validateUrl = (url, protocols = ['http', 'https']) => {
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