import { trigger, state, animate, group, query, transition, style } from '@angular/animations';

// This animation makes the details slide in and out.
export const searchAnimations =
    trigger('searchAnimations', [

        // end state styles for route container (host)
        state('*', style({
            // the view covers the whole screen with a semi transparent background
            width: '100%',
            top: 0,
            bottom: 0
        })),

        transition('mobile-search => mobile-search-results', [
            group([
                query(
                    ':enter',
                    [
                        style({
                            position: 'fixed',
                            width: '100%',
                            top: 0,
                            bottom: 0,
                            right: '-400%',
                            zIndex: 1
                        }),
                        animate('0.5s ease-in-out', style({
                            right: 0,
                        })),
                    ],
                    { optional: true }
                ),
                query(
                    ':leave',
                    [
                        style({
                            position: 'fixed',
                            width: '100%',
                            top: 0,
                            bottom: 0,
                            right: 0,
                        }),
                        animate('.5s ease-in-out', style({
                            right: 0
                        }))
                    ],
                    { optional: true }
                )
            ])
        ]),

        transition('mobile-search-results => mobile-search-detail', [
            group([
                query(
                    ':enter',
                    [
                        style({
                            position: 'fixed',
                            width: '100%',
                            top: 0,
                            bottom: 0,
                            right: '-400%',
                            zIndex: 1
                        }),
                        animate('0.5s ease-in-out', style({
                            right: 0,
                        })),
                    ],
                    { optional: true }
                ),
                query(
                    ':leave',
                    [
                        style({
                            position: 'fixed',
                            width: '100%',
                            top: 0,
                            bottom: 0,
                            right: 0,
                        }),
                        animate('.5s ease-in-out', style({
                            right: 0
                        }))
                    ],
                    { optional: true }
                )
            ])
        ]),

        transition('mobile-search-detail => mobile-search-results', [
            group([
                query(
                    ':enter',
                    [
                        style({
                            position: 'fixed',
                            width: '100%',
                            top: 0,
                            bottom: 0,
                            right: 0,
                        }),
                        animate('0.5s ease-in-out', style({
                            right: 0,
                        })),
                    ],
                    { optional: true }
                ),
                query(
                    ':leave',
                    [
                        style({
                            position: 'fixed',
                            width: '100%',
                            top: 0,
                            bottom: 0,
                            right: 0,
                            zIndex: 1
                        }),
                        animate('.5s ease-in-out', style({
                            right: '-400%'
                        }))
                    ],
                    { optional: true }
                )
            ])
        ]),

        transition('* => mobile-search', [
            group([
                query(
                    ':enter',
                    [
                        style({
                            position: 'fixed',
                            width: '100%',
                            top: 0,
                            bottom: 0,
                            right: 0,
                        }),
                        animate('0.5s ease-in-out', style({
                            right: 0,
                        })),
                    ],
                    { optional: true }
                ),
                query(
                    ':leave',
                    [
                        style({
                            position: 'fixed',
                            width: '100%',
                            top: 0,
                            bottom: 0,
                            right: 0,
                            zIndex: 1
                        }),
                        animate('.5s ease-in-out', style({
                            right: '-400%'
                        }))
                    ],
                    { optional: true }
                )
            ])
        ]),

        transition('* => mobile-account-settings', [
            group([
                query(
                    ':enter',
                    [
                        style({
                            position: 'fixed',
                            width: '100%',
                            top: 0,
                            bottom: 0,
                            right: '-400%',
                            zIndex: 1
                        }),
                        animate('0.5s ease-in-out', style({
                            right: 0,
                        })),
                    ],
                    { optional: true }
                ),
                query(
                    ':leave',
                    [
                        style({
                            position: 'fixed',
                            width: '100%',
                            top: 0,
                            bottom: 0,
                            right: 0,
                        }),
                        animate('.5s ease-in-out', style({
                            right: 0
                        }))
                    ],
                    { optional: true }
                )
            ])
        ]),

        transition('mobile-account-settings => *', [
            group([
                query(
                    ':enter',
                    [
                        style({
                            position: 'fixed',
                            width: '100%',
                            top: 0,
                            bottom: 0,
                            right: 0,
                        }),
                        animate('0.5s ease-in-out', style({
                            right: 0,
                        })),
                    ],
                    { optional: true }
                ),
                query(
                    ':leave',
                    [
                        style({
                            position: 'fixed',
                            width: '100%',
                            top: 0,
                            bottom: 0,
                            right: 0,
                            zIndex: 1
                        }),
                        animate('.5s ease-in-out', style({
                            right: '-400%'
                        }))
                    ],
                    { optional: true }
                )
            ])
        ]),
/*
        transition('* => mobile-company-settings', [
            group([
                query(
                    ':enter',
                    [
                        style({
                            position: 'fixed',
                            width: '100%',
                            top: 0,
                            bottom: 0,
                            right: '-400%',
                            zIndex: 1
                        }),
                        animate('0.5s ease-in-out', style({
                            right: 0,
                        })),
                    ],
                    { optional: true }
                ),
                query(
                    ':leave',
                    [
                        style({
                            position: 'fixed',
                            width: '100%',
                            top: 0,
                            bottom: 0,
                            right: 0,
                        }),
                        animate('.5s ease-in-out', style({
                            right: 0
                        }))
                    ],
                    { optional: true }
                )
            ])
        ]),

        transition('mobile-company-settings => *', [
            group([
                query(
                    ':enter',
                    [
                        style({
                            position: 'fixed',
                            width: '100%',
                            top: 0,
                            bottom: 0,
                            right: 0,
                        }),
                        animate('0.5s ease-in-out', style({
                            right: 0,
                        })),
                    ],
                    { optional: true }
                ),
                query(
                    ':leave',
                    [
                        style({
                            position: 'fixed',
                            width: '100%',
                            top: 0,
                            bottom: 0,
                            right: 0,
                            zIndex: 1
                        }),
                        animate('.5s ease-in-out', style({
                            right: '-400%'
                        }))
                    ],
                    { optional: true }
                )
            ])
        ]),*/
    ]);
