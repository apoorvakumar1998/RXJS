import { Component, OnInit } from '@angular/core';
import { from, fromEvent, interval, Observable, of, Subject, Subscription } from 'rxjs';
import { buffer, bufferCount, bufferTime, distinct, distinctUntilChanged, distinctUntilKeyChanged, filter, first, map, skip, skipLast, skipUntil, skipWhile, take, takeLast, takeUntil, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-leela-web-dev-rxjs',
  templateUrl: './leela-web-dev-rxjs.component.html',
  styleUrls: ['./leela-web-dev-rxjs.component.scss']
})
export class LeelaWebDevRxjsComponent implements OnInit {


  // ALL RXJS OPERATORS - COPY INTO CHATGPT
  /* 
  1 -> of,from,fromEvent

  */

  arrayObservable$ = of([1, 2, 3, 4, 5]);//from can also be used
  intervalSub: Subscription;
  destroy$ = new Subject<any>();
  numberSub$: Subscription;

  constructor() { }

  ngOnInit(): void {

    // 1) of,from example
    this.arrayObservable$.subscribe(res => {
      console.log(res);
    },
      (error) => console.log(error),
      () => console.log('Observable completed')
    )

    // 2) fromEvent
    fromEvent(document.getElementById('click-element'), 'click').subscribe(event => {
      console.log(event);
    })

    // this.buffer();
  }


  // 3) create new observable -> check class which implements Observer
  createNewObservable() {
    const newObservable$ = new Observable(observer => {
      // for (let i = 0; i < 5; i++) {
      //   observer.next(i);
      // }
      // observer.complete();
      // OR
      // observer.error('error');
      const intervalId = setInterval(() => {
        observer.next(Math.random());
      }, 1000);

      // Cleanup logic when unsubscribing
      return () => {
        console.log('Unsubscribed! Cleaning up resources...');
        clearInterval(intervalId);
      };
    })
    this.numberSub$ = newObservable$.subscribe(data => {
      console.log(data);
    },
      (err) => console.log(err),
      () => console.log('complete')
    )
  }

  //4) ways to cancel the subscription
  startSubscription() {
    const intervalObservable$ = interval(1000);
    this.intervalSub = intervalObservable$.subscribe(data => console.log(data))
    // OR
    intervalObservable$.pipe(takeUntil(this.destroy$)).subscribe(data => console.log(data))
  }

  // 4)
  cancelSubscription() {
    this.intervalSub.unsubscribe();
    this.numberSub$.unsubscribe()
    // OR
    this.destroy$.next();
    this.destroy$.complete();
  }


  // 5) Operators
  /*Types of operators
  1. Transformation -> output is completely different from input -> buffer,
  2. Filtering -> filter the data
  3. Combination -> join multiple observables
  4. Utility -> controls how and when values are produced,doesnt change the value
  5. Conditional -> send value only condition is met
  6. Aggregate -> combine all values of a single observable
  7. Multicast -> related to subjects
  8. Creation -> converts normal values into an observable




buffer -> stores all the values emitted from an observable until another observable emits an value and then emits all the values as an array



  */
  operators() {
    // Print only even numbers
    const newObs$ = interval(1000);
    newObs$.pipe(
      filter(item => item % 2 === 0),
      map(item => 'Even Number: ' + item)
    ).subscribe(data => {
      console.log(data);
    })
  }


  // collect values from the source observable into an array or buffer, 
  // and emit that buffer as a new array whenever another observable, known as the "closing" observable, emits a value.
  buffer() {
    const int$ = interval(1000);
    const button$ = fromEvent(document.getElementById('buffer'), 'click');
    const int2$ = interval(5000);
    int$.pipe(
      // tap(data => console.log(data)),// tap just logs the value the observable emits,can be used for debugging
      // buffer(int2$),// every 5 seconds when int2$ emits a value,int$ logs the value as an array
    ).subscribe(data => {
      console.log('buffer', data);
    });
  }


  // collect a specified number of consecutive values from the source observable and emit them as an array
  bufferCount() {
    const int$ = interval(1000);
    int$.pipe(
      take(10), // Take only the first 10 values for this example
      bufferCount(3, 1)// 2nd parameter skips n number of values and creates new buffer
    ).subscribe(data => {
      console.log('bufferCount', data);
    });
  }


  bufferTime() {
    const int$ = interval(1000);
    int$.pipe(
      bufferTime(1000)// 2nd parameter tells for every n second buffer is created
    ).subscribe(data => {
      console.log('bufferTime', data);
    });
  }
  // TODO: bufferWhen , bufferToggle

  take() {
    const int$ = interval(1000);
    int$.pipe(
      take(3) // observable will end after getting 3 values
    ).subscribe(data => {
      console.log('take', data);
    });
  }

  takeLast() {
    // of(1, 2, 3, 4, 5).pipe(
    //   takeLast(3)
    // ).subscribe(data => {
    //   console.log('takeLast', data);
    // });

    interval(1000).pipe(
      take(5),
      takeLast(3) // waits for the observable to complete and then take last n values,if observable doesnt end then no values will be printed
    ).subscribe(data => {
      console.log('takeLast', data);
    });
  }

  takeUntil() {
    const until$ = interval(5000);
    const int$ = interval(1000);
    int$.pipe(
      takeUntil(until$) // takes all the values until another observable emits an value and then completes the observable
    ).subscribe(data => {
      console.log('takeUntil', data);
    });
  }

  takeWhile() {
    const int$ = interval(1000);
    int$.pipe(
      takeWhile(i => i < 5, true) // takes all the values until condition is not satisfied for value emitted.
      // 2nd paramter if set to true emits the value which is failed also and then completed the obervable
    ).subscribe(data => {
      console.log('takeWhile', data);
    });
  }

  skip() {
    const int$ = interval(1000);
    int$.pipe(
      skip(3) // observable will skip first 3 values
    ).subscribe(data => {
      console.log('skip', data);
    });
  }

  skipLast() {
    interval(1000).pipe(
      take(5),
      skipLast(3) // waits for the observable to complete and then skip last n values,if observable doesnt end then no values will be printed,
      // doesnt wait for completion of observable,will only wait till n values
    ).subscribe(data => {
      console.log('skipLast', data);
    });
  }

  skipUntil() {
    const until$ = interval(5000);
    const int$ = interval(1000);
    int$.pipe(
      skipUntil(until$) // skips all the values until another observable emits an value
    ).subscribe(data => {
      console.log('skipUntil', data);
    });
  }

  skipWhile() {
    const int$ = interval(1000);
    int$.pipe(
      skipWhile(i => i < 5) // skips all the values until condition is not satisfied for value emitted.
      // 2nd paramter if set to true emits the value which is failed also and then completed the obervable
    ).subscribe(data => {
      console.log('skipWhile', data);
    });
  }

  // checks all the values emitted by source observable and emits value only if the value is not yet emitted,it used Set()
  distinct() {
    // of(1, 2, 3, 2, 3, 4, 5, 1, 7, 2).pipe(distinct()).subscribe(data => {
    //   console.log(data);
    // })
    const obj = [
      { id: 1, name: 'appu' },
      { id: 2, name: 'virat' },
      { id: 3, name: 'appu' }
    ]
    from(obj).pipe(distinct(
      item => item.name //keySelector function -> Optional function to select which value you want to check as distinct.
    )).subscribe(data => {
      console.log(data);
    })
  }

  //used === internally,so even if 2 objects are same,=== will be false(different memory)
  distinctUntilChanged() {
    of(1, 2, 3, 2, 3, 4, 5, 1, 1, 7, 2, 2).pipe(distinctUntilChanged()).subscribe(data => {
      console.log(data);
    })
    const obj = [
      { id: 1, name: 'appu' },
      { id: 2, name: 'virat' },
      { id: 3, name: 'virat' }
    ]
    // from(obj).pipe(distinctUntilChanged(
    //   (prev, curr) => prev.name === curr.name)
    // ).subscribe(data => {
    //   console.log(data);
    // })
    from(obj).pipe(distinctUntilChanged(
      (prev, curr) => prev === curr,
      k => k.name)// if key selector is used then no need to add key inside 1st function
    ).subscribe(data => {
      console.log(data);
    })
  }

  distinctUntilKeyChanged() {
    const obj = [
      { id: 1, name: 'appu' },
      { id: 2, name: 'virat' },
      { id: 3, name: 'virat' }
    ]
    from(obj).pipe(distinctUntilKeyChanged('id')// takes the key as 1st parameter for comparision,2nd parameter can be used to write custom logic to check === of prev with curr.
    ).subscribe(data => {
      console.log(data);
    })
  }
}