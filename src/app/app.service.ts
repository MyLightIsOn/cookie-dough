import {Injectable} from '@angular/core';

@Injectable()
export class AppService {
    device = 'desktop';
    searchStarted = false;

    getScreenSize() {
        const screenWidth = window.innerWidth;

        if (screenWidth < 1199) {
            this.device = 'mobile';
        }

        return this.device;
    }

    hideNav() {
        this.searchStarted = !this.searchStarted;
    }
}

