type ApiError = {
    response: {
      data: any
    }
  }
  
  type ValidationErrorEl = {
    field: string
    message: string
    namespace: string
  }
  
  type ValidationError = ValidationErrorEl[]
  
  export function isApiError(error: any): error is ApiError {
    return error.response && error.response.data
  }
  
  export function isValidationError(error: any): error is ValidationErrorEl[] {
    return Array.isArray(error) && error.length > 0 && error[0].field && error[0].message
  }
  