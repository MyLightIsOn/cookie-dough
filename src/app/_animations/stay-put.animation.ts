import { trigger, state, animate, transition, style } from '@angular/animations';


// This animation holds the leaving view in place while the animated view will slide on top.
export const stayPutAnimation =
    trigger('stayPutAnimation', [

        // end state styles for route container (host)
        state('*', style({
            width: '100%',
            top: 0,
            zIndex: 3
        })),

        // route 'enter' transition
        transition(':enter', [

            // styles at start of transition
            style({
                right: 0,
                zIndex: 3
            }),

            // animation and styles at end of transition
            animate('.5s ease-in-out', style({
                right: 0,
            }))
        ]),

        // route 'leave' transition
        transition(':leave', [
            // styles at start of transition
            style({
                right: 0,
                zIndex: 3
            }),

            // animation and styles at end of transition
            animate('.5s ease-in-out', style({
                right: 0,
            }))
        ])
    ]);

