
exports.handler = (event, _context, callback) => {

  event.Records.forEach((record) => {
    const { NewImage, OldImage, Keys } = record.dynamodb

    const oldLocation = getProfileLocation(OldImage)
    const newLocation = getProfileLocation(NewImage)

    const identity = Keys.id.S
    if (oldLocation === newLocation) {
      console.log(`Identity '${identity}' - no change in location.`)
    }
    else {
      console.log(`Identity '${identity}' - location changed from '${oldLocation}' to '${newLocation}'.`)
    }
  })

  callback(null, `Successfully processed ${event.Records.length} records.`)
}

function getProfileLocation(record) {
  if (record.profile) {
    if (record.profile.M) {
      if (record.profile.M.location) {
        return record.profile.M.location.S
      }
    }
  }
  return null
}
