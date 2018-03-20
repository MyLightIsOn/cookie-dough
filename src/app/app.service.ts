import {Injectable} from '@angular/core';

@Injectable()
export class AppService {
    device = 'desktop';
    searchStarted = false;
    screenWidth = window.innerWidth;

    getScreenSize() {

        if (this.screenWidth < 1199) {
            this.device = 'mobile';
        }

        return this.device;
    }

    hideNav() {
        this.searchStarted = true;
    }

    showNav() {
        this.searchStarted = false;
    }

    fieldFocus() {
        if (this.device === 'mobile') {
            this.hideNav();
        }
    }
}

