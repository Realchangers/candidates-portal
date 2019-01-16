
exports.handler = (event, _context, callback) => {

  event.Records.forEach((record) => {
    const { NewImage, OldImage, Keys } = record.dynamodb
    const identity = Keys.cognitoID.S
    const recordID = Keys.id.S

    if (recordID !== 'profile') {
      console.log(`Identity='${identity}' - skipping update for non-profile record. `)
      return
    }

    const oldLocation = getProfileLocation(OldImage)
    const newLocation = getProfileLocation(NewImage)

    if (oldLocation === newLocation) {
      console.log(`Identity='${identity}' - field 'location' has not changed`)
    }
    else {
      console.log(`Identity='${identity}' - field 'location' changed from '${oldLocation}' to '${newLocation}'`)
    }
  })

  callback(null, `Successfully processed ${event.Records.length} records.`)
}

function getProfileLocation(record) {
  if (record) {
    if (record.location) {
      return record.location.S
    }
  }
  return null
}
