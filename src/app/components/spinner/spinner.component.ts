import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent implements OnInit {
  spinnerDiameter$: Observable<number>;

  @Input() diameter = 200;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.spinnerDiameter$ = this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
      map(obs => obs.matches ? 75/100 * this.diameter : this.diameter),
    );
  }

}
