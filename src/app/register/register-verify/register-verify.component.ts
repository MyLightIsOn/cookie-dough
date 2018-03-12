import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-verify',
  templateUrl: './register-verify.component.html',
  styleUrls: ['./register-verify.component.css']
})
export class RegisterVerifyComponent implements OnInit {

  constructor(public registerService: RegisterService, public route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
         this.registerService.verifiyUser(params['id']).subscribe();
      });
  }
}
