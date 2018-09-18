const fs = require('fs');

module.exports = (file) => {
    const bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}