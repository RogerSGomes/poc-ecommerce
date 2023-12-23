export class BadRequestException {
  status: number = 400;
  message: string;

  constructor(errorMessage: string) {
    this.message = errorMessage;
  }
}
