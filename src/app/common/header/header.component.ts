import { Component, Input, OnInit } from '@angular/core';
import { faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
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
  constructor() {}

  ngOnInit(): void {}
}
