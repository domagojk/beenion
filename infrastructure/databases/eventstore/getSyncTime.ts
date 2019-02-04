import ntpClient from 'ntp-client'

const timeSyncEndpoint = process.env.NTP_URL || '169.254.169.123'

export function getSyncTime() {
  return new Promise((resolve, reject) => {
    ntpClient.getNetworkTime(timeSyncEndpoint, 123, function(err, date) {
      if (err) {
        reject(err)
        return
      }

      const jsDate = new Date(date)
      resolve(jsDate.getTime())
    })
  })
}
