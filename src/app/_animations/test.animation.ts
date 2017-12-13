// import the required animation functions from the angular animations module
import { trigger, state, animate, transition, style } from '@angular/animations';

export const testAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('testAnimation', [

        state('in', style({transform: 'translateX(0)'})),
        transition('void => *', [
            style({transform: 'translateX(-100%)'}),
            animate(100)
        ]),
        transition('* => void', [
            animate(100, style({transform: 'translateX(100%)'}))
        ])
    ]);

