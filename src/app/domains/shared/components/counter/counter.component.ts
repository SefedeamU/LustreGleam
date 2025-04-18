import { Component, Input, signal, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {

  @Input({required: true}) duration:number = 0;
  @Input({required: true}) message:string = '';

  counter = signal(0);
  counterRef : number | undefined;

  constructor() {
    // NO ASYNC
    console.log('$Constructor$');
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges) {
    // before and during render
    console.log('$ngOnChanges$');
    console.log('-'.repeat(10));
    console.log(changes);
    const duration = changes['duration'];
    if(duration && duration.currentValue !== duration.previousValue) {
      this.doSomething();
    }
  }

  ngOnInit() {
    // after render
    // una vez
    // async, then, subs
    console.log('$ngOnInit$')
    console.log('-'.repeat(10));
    console.log('duration ==>', this.duration);
    console.log('message ==>', this.message);
    this.counterRef = window.setInterval(() => {
      console.log('Intervalo de 1 segundo');
      this.counter.update(statePrev => statePrev + 1);
    }, 1000);
  }

  ngAfterViewInit() {
    console.log('$ngAfterViewInit$')
    console.log('-'.repeat(10));
  }

  ngOnDestroy() {
    console.log('$ngOnDestroy$')
    console.log('-'.repeat(10));
    window.clearInterval(this.counterRef);
  }

  doSomething() {
    //Async
    console.log('change duration');
  }
}
