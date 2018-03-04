export const accessDenied = () => new Error('access denied')
export const stageCompleted = () => new Error('review stage completed')
export const notLinkReviewer = () => new Error('user was not assigned as link reviewer')