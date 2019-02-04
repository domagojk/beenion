export function parseObject(eventBody) {
  let postParams
  try {
    postParams = JSON.parse(eventBody)
  } catch (err) {
    console.log(err)
  }

  return postParams
}
