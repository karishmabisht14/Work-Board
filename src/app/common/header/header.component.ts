import { Component, Input, OnInit } from '@angular/core';
import { faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/main/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input()
  content: string = '';
  faUnlockKeyhole = faUnlockKeyhole;
  faUser = faUser;
  constructor(private modalService: NgbModal) {}
  ngOnInit(): void {}

  openModal() {
    const modalRef = this.modalService.open(LoginComponent, {});
    modalRef.componentInstance.name = '';
  }
}
