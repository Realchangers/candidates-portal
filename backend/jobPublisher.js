
exports.handler = (event, _context, callback) => {

  event.Records.forEach((record) => {
    console.log(`Event: ${record.eventName}, Record: ${JSON.stringify(record.dynamodb, null, 2)}`)
  })

  callback(null, `Successfully processed ${event.Records.length} records.`)
}
