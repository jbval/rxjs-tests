import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Observable, timer, Subject } from 'rxjs';
import {
  map,
  finalize,
  takeUntil,
  share,
  shareReplay
} from 'rxjs/operators';
import { watch } from 'rxjs-watcher';

@Component({
  selector: 'app-shared-replay',
  templateUrl: './shared-replay.component.html',
  styleUrls: ['./shared-replay.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedReplayComponent implements OnInit, OnDestroy {
  numbers$: Observable<number>;
  numbersDelay1$: Observable<number>;
  // numbersDelay2$: Observable<number>;
  numbersWithShare$: Observable<number>;
  numbersWithShareReplay$: Observable<number>;
  numbersWithShareDelay1$: Observable<number>;
  numbersWithShareReplayDelay1$: Observable<number>;
  private readonly stopNumbers$ = new Subject<void>();
  constructor() {}

  ngOnInit(): void {
    
    this.numbers$ = this.getNumbers().pipe(
      watch('in numbers$ pipe', 10),
      takeUntil(this.stopNumbers$)
    );

    this.numbersWithShare$ = this.getNumbers().pipe(
      watch('in numbers$ pipe with share', 10),
      share(),
      takeUntil(this.stopNumbers$)
    );
    this.numbersWithShareReplay$ = this.getNumbers().pipe(
      watch('in numbers$ pipe with shareReplay(1)', 10),
      shareReplay(1),
      takeUntil(this.stopNumbers$)
    );

    window.setTimeout(() => {
      this.numbersDelay1$ = this.numbers$.pipe(watch('numberDelay1$', 10));
      this.numbersWithShareDelay1$ = this.numbersWithShare$.pipe(
        watch('numberWithShareDelay1$', 10)
      );
      this.numbersWithShareReplayDelay1$ = this.numbersWithShareReplay$.pipe(
        watch('numberWithShareReplayDelay1$', 10)
      );
    }, 500);
  }

  private getNumbers(): Observable<number> {
    return timer(0, 1000).pipe(
      map(x => x * 10),
      finalize(() => console.log('Unsubscribing from source'))
    );
  }

  ngOnDestroy() {
    this.stopNumbers$.next();
    this.stopNumbers$.complete();
  }
}
