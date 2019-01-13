const zlib = require('zlib')
const fs = require('fs')

const gzip = zlib.createGzip()
const input = fs.createReadStream('./jobDescription.txt')
const output = fs.createWriteStream('./jobDescription.txt.gz')

input.pipe(gzip).pipe(output)
