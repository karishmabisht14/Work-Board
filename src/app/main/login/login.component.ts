import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pattern } from 'src/core/providers/constants';
import { LoginService } from 'src/core/providers/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern(Pattern.emailPattern)],
      ],
      password: [
        '',
        [Validators.required],
      ],
    });
  }

  ngOnInit(): void { }

  submitLoginForm() {
    console.log(this.loginForm.getRawValue());
    if (this.loginForm.valid) {
      let credentials = this.loginForm.getRawValue();
      this.loginService.login(credentials).subscribe((success: any) => {
        console.log("Logged In", success);
      })
    }
  }
}
