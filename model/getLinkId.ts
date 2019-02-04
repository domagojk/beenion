import md5 from "md5"

export function getLinkId(userId: string, linkUrl: string) {
  return md5(`${userId}-${linkUrl}`)
}
