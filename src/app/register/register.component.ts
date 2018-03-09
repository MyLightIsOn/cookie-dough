import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public email;
    public password;
    public role = 'Individual';
    public individualRole: boolean;

    constructor(private registerService: RegisterService) { }

    ngOnInit() {
      this.individualRole = true;
    }

    roleSelect(role) {
      if (role === 'individual') {
          this.individualRole = true;
          this.role = 'Individual';
      } else {
          this.individualRole = false;
          this.role = 'Business Owner';
      }
    }

    submitRegistration() {
        const user = {};
        const email = {};
        email['email'] = this.email;

        user['field_19'] = email;
        user['field_20'] = this.password;
        user['field_22'] = this.role;
        this.registerService.registerUser(user).subscribe();
    }
}
