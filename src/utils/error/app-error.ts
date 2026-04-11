class AppError extends Error {
  constructor(public statusCode: number, message: string | string[]) {
    super(Array.isArray(message) ? message.join(" ,") : message);

    // console.log("message from app error", message);
    // this.statusCode = statusCode; // it is basically redundant in typsescript because when we use private statusCode: number, it automaticlly handles this line
    // this.message = message; // it is also redundant  because wehn we call supper(message) ->  // Error sets this.message = message , so it is handled here

    // this.message = message → gone, super() handles it
    Error.captureStackTrace(this, AppError);
  }

  toJSON() {
    return {
      name: this.name,
      statusCode: this.statusCode,
      explanation: this.message.split(",").map((part) => part.trim()),
    };
  }
}

export default AppError;
