export class AppResponse<T> {
  public statusCode: number;
  public success: boolean;
  public message: string;
  public data?: T;

  constructor(message: string, data?: T, statusCode: number = 200) {
    this.success = true;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }
}
