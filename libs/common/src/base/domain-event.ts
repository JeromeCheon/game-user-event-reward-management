export abstract class DomainEvent {
  public readonly dateOccurred: Date;
  abstract readonly eventName: string;

  constructor() {
    this.dateOccurred = new Date();
  }
}
