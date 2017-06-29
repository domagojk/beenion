export class ProjectCreated {
  public type = 'projectCreated'
  public timestamp = Date.now()
  constructor(
    public projectId: string,
    public userId: number,
    public name: string,
    public description: string,
    public link: string
  ) {}
}

export class ProjectDetailsUpdated {
  public type = 'projectDetailsUpdated'
  public timestamp = Date.now()
  constructor(
    public projectId: string,
    public userId: number,
    public name: string,
    public description: string,
    public link: string
  ) {}
}
