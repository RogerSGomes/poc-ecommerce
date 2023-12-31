export class UnauthorizedException {
  status: number = 401;
  message: string;

  constructor(errorMessage: string) {
    this.message = errorMessage;
  }
}
