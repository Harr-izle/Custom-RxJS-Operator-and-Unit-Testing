import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { from, Observable, tap, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Custom-RxJS-Operator-and-Unit-Testing';

  valueBefore: number[] = [];
  valueAfterMultiply: number[] = [];
  valueAfterDivide: number[] = [];

  // Observable to generate random numbers
  numbers$ = from(Array.from({ length: 10 }, () => Math.floor(Math.random() * 11)));

  ngOnInit() {
    this.numbers$.pipe(this.multiplyBy(10)).subscribe((result) => {
      console.log(`Value After Multiplication: ${result}`);
      this.valueAfterMultiply = [...this.valueAfterMultiply, result];
    });

    this.numbers$.pipe(this.divideBy(2)).subscribe((result) => {
      console.log(`Value After Division: ${result}`);
      this.valueAfterDivide = [...this.valueAfterDivide, result];
    });
  }

  // Custom operator to multiply the numbers by a given value
  multiplyBy(factor: number) {
    return (source$: Observable<number>) => {
      return source$.pipe(
        tap((value) => this.valueBefore = [...this.valueBefore, value]),
        map((value) => value * factor)
      );
    };
  }
 

  //bonus
  // Custom operator to divide the numbers by a given value
  divideBy(divisor: number) {
    return (source$: Observable<number>) => {
      return source$.pipe(
        map((value) => value / divisor)
      );
    };
  }


}
