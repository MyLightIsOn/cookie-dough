import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import { AuthGuard } from './auth-guard.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {FlashMessagesService} from '../flash-messages.service';

const router = {
    navigate: jasmine.createSpy('navigate')
};

let store = {};
const mockLocalStorage = {
    getItem: (key: string): string => {
        return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
        store[key] = `${value}`;
    },
    removeItem: (key: string) => {
        delete store[key];
    },
    clear: () => {
        store = {};
    }
};

const fakeRoute = new ActivatedRouteSnapshot();
const mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

describe('AuthGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ AuthGuard, AuthService, FlashMessagesService,
                { provide: Router, useValue: router },
                {provide: RouterStateSnapshot, useValue: mockSnapshot}
                ]
        });
    });

    it('should be created', inject([AuthGuard], (service: AuthGuard) => {
        expect(service).toBeTruthy();
    }));

    it('should be check the login', inject([AuthGuard], (service: AuthGuard) => {
        spyOn(service, 'checkLogin');
        service.canActivate(fakeRoute, mockSnapshot);

        expect(service.checkLogin).toHaveBeenCalled();
    }));

    it('should be get the cuurent session', inject([AuthGuard], (service: AuthGuard) => {
        localStorage.setItem('currentUser', 'anothertoken');
        spyOn(localStorage, 'getItem')
            .and.callFake(mockLocalStorage.getItem);

        service.getSession();

        expect(localStorage.getItem).toHaveBeenCalledWith('currentUser');
    }));

    it('should return true if there is a current user', inject([AuthGuard], (service: AuthGuard) => {
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', 'anothertoken');

        const bool = service.checkLogin('/search');

        expect(bool).toBe(true);
    }));

    it('should return false if there is no current user', inject([AuthGuard], (service: AuthGuard) => {
        localStorage.removeItem('currentUser');
        const bool = service.checkLogin('/search');

        expect(bool).toBe(false);
    }));

    it('should call canActivate with the route and state', inject([AuthGuard], (service: AuthGuard) => {
        spyOn(service, 'canActivate');
        service.canActivateChild(fakeRoute, mockSnapshot);

        expect(service.canActivate).toHaveBeenCalledWith(fakeRoute, mockSnapshot);
    }));
});
