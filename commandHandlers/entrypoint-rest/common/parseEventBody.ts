export function parseObject(eventBody) {
  let postParams
  try {
    postParams = JSON.parse(eventBody)
  } catch (err) {}

  return postParams
}
