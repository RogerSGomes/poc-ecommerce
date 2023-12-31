export class NotFoundException {
  status: number = 404;
  message: string;

  constructor(errorMessage: string) {
    this.message = errorMessage;
  }
}
