import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest, from, fromEvent, interval, Observable, of, Subscriber } from 'rxjs';
import { debounceTime, take, takeLast, takeWhile, first, takeUntil, last, elementAt, filter, distinct, skip, count, max, min, map, switchMap, mergeMap, exhaustMap } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html'
})
export class RxjsComponent implements OnInit {
  title = 'rxjs';
  obervable: Observable<string>;
  of_observable: Observable<string> = of('a', 'b', 'c');
  from_observable: Observable<string> = from(['a', 'b', 'c', 'a', 'b']);
  @ViewChild('buttonRef') buttonRef: ElementRef;
  buttonObservable$: Observable<any>;
  searchForm: FormGroup;

  users$ = of([
    {
      name: 'appu', id: 1
    },
    {
      name: 'koushik', id: 2
    }
  ])
  user$: Observable<number> = of(2);

  userName$ = this.users$.pipe(map(user => user.map(data => data.name)));
  filteredUser$ = this.users$.pipe(filter(data => data.some(i => i.id === 2)))
  combineLatest$: Observable<any>;


  map$: Observable<any> = of(1, 2, 3, 4, 5);

  foo$: Observable<any> = of([1, 2, 3, 4, 5]);
  ngOnInit(): void {
    // Create a observable 
    // this.obervable = new Observable(
    //   function (observer) {
    //     try {
    //       observer.next('data');
    //     } catch (e) {
    //       observer.next(e);
    //     }
    //   }
    // )
    // this.obervable.subscribe(data => {
    //   console.log(data);
    // })

    // Interval
    // this.from_observable.subscribe(data => {
    //   const interval$: Observable<number> = interval(1000);
    //   interval$.subscribe(number => {
    //     console.log(data + number);
    //   })
    //   console.log(data);
    // })

    // Debounce
    this.searchForm = new FormGroup({
      'searchField': new FormControl('search text')
    })
    // this.searchForm.get('searchField').valueChanges.pipe(
    //   // take(5), //take number of characters
    //   // takeWhile(i => this.checkTakeWhile(i)), // Take values toll condition
    //   debounceTime(300)
    // ).subscribe(data => {
    //   console.log(data);
    //   this.of_observable.pipe(
    //     // takeLast(1).
    //     // first()
    //     // last()
    //     elementAt(0)
    //   ).subscribe(data1 => {
    //     console.log(data1);
    //   })
    // })

    // this.from_observable.pipe(
    //   // takeLast(2)
    //   // distinct(),
    //   // skip(1)
    //   min()
    // ).subscribe(data => {
    //   console.log(data);
    // })

    // const number = interval(100);
    // number.pipe(
    //   // first()
    //   // elementAt(1)
    //   // filter(v => v > 10),//this will just filter out the data
    //   // takeWhile(v => v < 10)// subscription will stop until condition is satisfied
    //   // skip(2)
    // ).subscribe(data => {
    //   console.log(data);
    // })




    /** Different map functions
     * 
     * mergeMap -> execute all requests all at a time,who returns the response first will be outputted (subscribed)(cant guaranatee same output).
     * concatMap -> execute all requests one after the other(same sequence all the time)
     * switchMap -> immediately switch to new request and cancel the current request
     * exhaustMap -> neglect and skip new request when current request is being executed and take new request when current one is done
     */
    this.map$.pipe(
      exhaustMap((data) => {
        return new Observable((observer) => {
          setTimeout(() => {
            observer.next(data);
            observer.complete();
          }, 1000);
        });
      })
    ).subscribe((i) => {
      console.log(i);
    });
  }

  checkTakeWhile(data): boolean {
    return data.length > 5 ? false : true;
  }

  // From event
  fromEventButton() {
    this.buttonObservable$ = fromEvent(this.buttonRef.nativeElement, 'click');
    this.buttonObservable$.subscribe(data => {
      console.log(data);
    })
  }
}
