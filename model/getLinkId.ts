import * as md5 from 'md5'
import { UserData } from './userdata'

export function getLinkId(user: UserData, linkUrl: string) {
  return md5(`${user.userId}-${linkUrl}`)
}
