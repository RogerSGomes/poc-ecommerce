export class InternalServerErrorException {
  status: number = 500;
  message: string;

  constructor(errorMessage: string) {
    this.message = errorMessage;
  }
}
