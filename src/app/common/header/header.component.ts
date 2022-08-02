import { Component, Input, OnInit } from '@angular/core';
import * as icons from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/main/login/login.component';
import { LoginService } from 'src/core/providers/services/login.service';
import { SharedService } from 'src/core/providers/services/shared.service';

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
  constructor(private modalService: NgbModal, public sharedService: SharedService,
    private loginService: LoginService) { }
  ngOnInit(): void {
    this.sharedService.currentUser.subscribe((user: any) => {
      if (user._id) {
        this.user = user;
      }
      else this.user = null;
    })

  }

  openLoginModal() {
    const modalRef = this.modalService.open(LoginComponent, {});
    modalRef.componentInstance.name = '';
  }

  openSignUpModal() {
    const modalRef = this.modalService.open(LoginComponent, {});
    modalRef.componentInstance.name = '';
  }

  logout() {
    this.loginService.logout().subscribe(result => {
      console.log("Logged Out........", result);
    })
  }
}
