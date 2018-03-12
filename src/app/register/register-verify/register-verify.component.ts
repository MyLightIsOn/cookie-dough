import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RegisterService } from '../register.service';
import { LoginService } from '../../login/login.service';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-register-verify',
  templateUrl: './register-verify.component.html',
  styleUrls: ['./register-verify.component.css']
})
export class RegisterVerifyComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(
      public registerService: RegisterService,
      public route: ActivatedRoute,
      public loginService: LoginService,
      public appService: AppService) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
         this.registerService.verifiyUser(params['id']).subscribe();
      });
  }
}
