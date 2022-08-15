import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as icons from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/main/login/login.component';
import { SignupComponent } from 'src/app/main/signup/signup.component';
import { LoginService } from 'src/core/providers/services/login.service';
import { SharedService } from 'src/core/providers/services/shared.service';
import { TaskService } from 'src/core/providers/services/task.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input()
  content: string = '';
  icons = icons;
  user: any;
  constructor(private modalService: NgbModal, public _sharedService: SharedService,
    private _loginService: LoginService, private router: Router, private _taskService: TaskService) { }
  ngOnInit(): void {
    this._sharedService.currentUser.subscribe((user: any) => {
      if (user._id) {
        this.user = user;
      }
      else this.user = null;
    });
  }

  openLoginModal() {
    const modalRef = this.modalService.open(LoginComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.name = 'Login';
  }

  openSignUpModal() {
    const modalRef = this.modalService.open(SignupComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.name = 'Sign Up';
  }

  gotTo(url: string) {
    if (url === "/") {
      this._taskService.resetTasks();
    }
    this.router.navigate([url]);
  }

  logout() {
    this._loginService.logout().subscribe(result => {
      this._taskService.resetTasks();
      this.gotTo("/");
    });
  }
}
