
exports.handler = (event, _context, callback) => {

  console.log('Received event: %j', JSON.stringify(event, null, 2))

  callback(null, `Successfully processed ${event.Records.length} records. `)
}
