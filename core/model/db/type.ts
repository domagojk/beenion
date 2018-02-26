export type Db = {
  get: (id: string) => Promise<any>
  save: (id: string, doc: any) => Promise<any>
  update: (id: string, doc: any) => Promise<any>
  delete: (id: string) => Promise<any>
}
