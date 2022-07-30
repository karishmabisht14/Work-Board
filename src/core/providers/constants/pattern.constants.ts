export class Pattern {
    static usernamePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    static emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    static passwordPattern = /^(?!.* )(?=.*\d)(?=.*[a-z]).{6,15}$/;
    static mobileNo = /^\d{10}$/;
    static otpPattern = /^\d{6}$/;
    static zip = /^[0-9]/;
  }