import { ValidationError } from "@nestjs/common";

export class DomainError extends Error {
  constructor(
    errors: ValidationError[],
    message?: string
  ) {
    const _errors: Array<string> = [];
    errors?.length && errors.forEach((error) => {
      error?.constraints && Object.entries(error.constraints).forEach((value) => {
        _errors.push(value[1])
      })
    })
    super(
      `Ошибки: ${_errors.join('; ')}${message?.length
        ? ' Сообщение ' + message
        : ''
      }`
    )
    this.name = DomainError.name;
  }
}