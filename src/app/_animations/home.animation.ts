import { trigger, state, animate, transition, style } from '@angular/animations';


// This animation holds the homepage in place while the animated view will slide on top. It is used for whe
// the user goes from a search detail all the back home.
export const homeAnimation =
    trigger('homeAnimation', [

        // end state styles for route container (host)
        state('*', style({
            width: '100%',
            top: 0,
            zIndex: 0
        })),

        // route 'enter' transition
        transition(':enter', [

            // styles at start of transition
            style({
                right: 0,
                zIndex: 0
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
                zIndex: 0
            }),

            // animation and styles at end of transition
            animate('.5s ease-in-out', style({
                right: 0,
            }))
        ])
    ]);

