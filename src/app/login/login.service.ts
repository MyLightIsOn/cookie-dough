import {Injectable} from '@angular/core';

import { AuthService } from '../auth.service';

@Injectable()
export class LoginService {
    constructor(private authService: AuthService) {}

    login(email: string, password: string): void {
        this.authService.login(email, password).subscribe();
    }
}
