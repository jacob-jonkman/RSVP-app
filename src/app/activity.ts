export class Activity {
    constructor(
      public name: string,
      public date: Date,
      // public time: Time,
      public location: string,
      public owner: string,
      public description: string,
      public attendees: string[],
      public creator: string,
      public id?: string,
    ) {}
}
