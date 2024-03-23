export class StringValidator {
  private error: string = '';
  private mValue: string = '';

  constructor(value: unknown) {
    if (!value) {
      this.mValue = '';
    } else {
      if (typeof value !== 'string') {
        if (!this.error) {
          this.error += 'Must be a string! ';
        }
      } else {
        this.mValue = value;
      }
    }
  }

  mobileNumber(message: string = 'Invalid mobile number.') {
    if (
      !this.mValue.match(
        /(^(([+]{1}|[0]{2})([0-9]{2}))?([-]{1})?([0-9]{5})([-]{1})?([0-9]{6}))$/
      )
    ) {
      if (!this.error) {
        this.error += message;
      }
    }
    return this;
  }

  notEmpty(message = 'String can not be empty. ') {
    if (!this.mValue) {
      if (!this.error) {
        this.error += message;
      }
    }

    return this;
  }

  regex(pattern: RegExp, message = 'Pattern do not match. ') {
    if (!pattern.test(this.mValue)) {
      if (!this.error) {
        this.error += message;
      }
    }

    return this;
  }

  email(message = 'Invalid email address. ') {
    if (!this.mValue.match(/[a-z0-9._%+-]+@[a-z0-9.-]+([.]{1})+[a-z]{2,}$/)) {
      if (!this.error) {
        this.error += message;
      }
    }
    return this;
  }

  url(message = 'Pattern do not match. ') {
    // /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return this;
  }

  includes(text: string, message = `Must include ${text}. `) {
    if (!this.mValue.includes(text)) {
      if (!this.error) {
        this.error += message;
      }
    }
    return this;
  }

  startWith(text: string, message = `Must include ${text}. `) {
    if (!this.mValue.startsWith(text)) {
      if (!this.error) {
        this.error += message;
      }
    }
    return this;
  }

  endsWith(text: string, message = `Must include ${text}. `) {
    if (!this.mValue.endsWith(text)) {
      if (!this.error) {
        this.error += message;
      }
    }
    return this;
  }

  dateTime(message = `Invalid date time. `) {
    if (!isNaN(new Date(this.mValue).getDate())) {
      if (!this.error) {
        this.error += message;
      }
    }
    return this;
  }

  ip(message = `Must include. `) {
    return this;
  }

  minLength(
    minLength: number,
    message = `String must be at least ${minLength} characters. `
  ) {
    if (this.mValue.length < minLength) {
      if (!this.error) {
        this.error += message;
      }
    }
    return this;
  }

  maxLength(
    maxLength: number,
    message = `String must be at most ${maxLength} characters. `
  ) {
    if (this.mValue.length > maxLength) {
      if (!this.error) {
        this.error += message;
      }
    }
    return this;
  }

  validate(): string {
    return this.error;
  }
}
