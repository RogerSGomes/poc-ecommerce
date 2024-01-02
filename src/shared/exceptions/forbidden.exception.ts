export class ForbiddenException {
  status: number = 403;
  message: string;

  constructor(errorMessage: string) {
    this.message = errorMessage;
  }
}
