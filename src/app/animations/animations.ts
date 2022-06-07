import { animate, group, state, style, transition, trigger } from "@angular/animations";

export const fadeIn = trigger('fadeIn', [
    state('*', style({})),
      transition(':enter',[
          style({opacity:'0', height: 0}),
        animate('0.5s ease-in', style({ opacity: '1' , height: 300}))
      ]),
      transition(':leave',[
          style({opacity:'0'}),
        animate('0.5s ease-out', style({ opacity: '0', height: 0 }))
      ]),
  ])




  trigger('fade', [
    transition('void => active', [ // using status here for transition
      style({ opacity: 0 }),
      animate(500, style({ opacity: 1 }))
    ]),
    transition('* => void', [
      animate(500, style({ opacity: 0 }))
    ])
  ]),
  trigger('slideInOut', [
    state('in', style({
        'max-height': '500px', 'opacity': '1', 'visibility': 'visible'
    })),
    state('out', style({
        'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
    })),
    transition('in => out', [group([
        animate('400ms ease-in-out', style({
            'opacity': '0'
        })),
        animate('600ms ease-in-out', style({
            'max-height': '0px'
        })),
        animate('700ms ease-in-out', style({
            'visibility': 'hidden'
        }))
    ]
    )]),
    transition('out => in', [group([
        animate('1ms ease-in-out', style({
            'visibility': 'visible'
        })),
        animate('600ms ease-in-out', style({
            'max-height': '500px'
        })),
        animate('800ms ease-in-out', style({
            'opacity': '1'
        }))
    ]
    )])
])