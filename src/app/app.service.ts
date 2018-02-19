import {Injectable} from '@angular/core';

@Injectable()
export class AppService {
    device = 'desktop';

    getScreenSize() {
        const screenWidth = window.innerWidth;

        if (screenWidth < 1199) {
            this.device = 'mobile';
        }

        return this.device;
    }
}

