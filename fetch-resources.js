import camelCaseKeys from 'camelcase-keys'

// Take the weird format that AirTable gives us and
// make it more usable.
function normalizeData(fields) {
  return fields
    .map(item => camelCaseKeys(item.fields))
    .filter(item => Object.keys(item).length)
}

export default function fetchResources(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(json => {
        resolve(normalizeData(json.items))
      })
      .catch(error => {
        reject(error)
        console.log('ERROR:', error)
      })
  })
}
