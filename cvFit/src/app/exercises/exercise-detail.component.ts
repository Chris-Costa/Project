import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { ExerciseService } from './exercise.service';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseDetailComponent {
  errorMessage=' ';
  constructor(private router: Router, private exerciseService: ExerciseService, public sanitizer: DomSanitizer) { }

  exercise$ = this.exerciseService.selectedExercise$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  onBack(): void {
    if (this.exerciseService.detailsMethod){
      this.router.navigate(['/exercises']);
    }
    else {
      this.router.navigate(['/workoutlist'])
    }
  }
}
