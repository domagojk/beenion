// import ntpClient from 'ntp-client'

// const timeSyncEndpoint = process.env.NTP_URL || '169.254.169.123'

// NOTE
// removed ntp sync time since it stopped working in lambda
// todo: it should be invastigated why

export function getSyncTime() {
  return new Promise((resolve, reject) => {
    resolve(Date.now())
    /*
    ntpClient.getNetworkTime(timeSyncEndpoint, 123, function(err, date) {
      if (err) {
        reject(err)
        return
      }

      const jsDate = new Date(date)
      resolve(jsDate.getTime())
    })
    */
  })
}
