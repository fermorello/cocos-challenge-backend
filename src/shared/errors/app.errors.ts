export class AppError extends Error {
    constructor(
      public readonly message: string,
      public readonly statusCode: number = 500,
      public readonly code?: string
    ) {
      super(message);
      this.name = 'AppError';
    }
  }
  
  export class NotFoundError extends AppError {
    constructor(message: string = 'Resource not found') {
      super(message, 404, 'NOT_FOUND');
    }
  }
  
  export class ValidationError extends AppError {
    constructor(message: string) {
      super(message, 400, 'VALIDATION_ERROR');
    }
  }
  
  export class DatabaseError extends AppError {
    constructor(message: string = 'Database error occurred') {
      super(message, 500, 'DATABASE_ERROR');
    }
  }