import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pattern } from 'src/core/providers/constants';
import { LoginService } from 'src/core/providers/services/login.service';
import { AlertService } from 'src/core/providers/services/sweetAlert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private alertService: AlertService
  ) {
    this.signupForm = this.formBuilder.group({
      firstName: [
        '',
        [Validators.required],
      ],
      lastName: [''],
      email: [
        '',
        [Validators.required, Validators.pattern(Pattern.emailPattern)],
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
      confirmPassword: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
    });
  }

  ngOnInit(): void { }

  submitSignupForm() {
    if (this.signupForm.valid) {
      let signUpData = this.signupForm.getRawValue();
      this.loginService.signUp(signUpData).subscribe((userDetails: any) => {
        this.activeModal.dismiss('Registration Success!');
        this.alertService.showSuccessAlert(`Welcome! ${userDetails?.firstName}`, 'You have successfully Registered', false, false, 3000, 'top-right')
      })
    }
  }

  get passwordMatchError() {
    return this.signupForm.controls['password'].value === this.signupForm.controls['confirmPassword'].value;
  }

}
