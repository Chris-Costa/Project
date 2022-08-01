import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { IExercise } from './exercise';
import { ExerciseService } from './exercise.service';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.css']
})
export class ExerciseDetailComponent implements OnInit {
  errorMessage=' ';
  exercise: IExercise | undefined;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id){
      this.getExercise(id);
    }
  }
  //routing with code
  //go from detail expansion page back to exercise list
  onBack(): void{
    this.router.navigate(['/exercises']);
  }
  getExercise(id: number): void {
    this.exerciseService.getExercise(id).subscribe({
      next: exercise => this.exercise = exercise,
      error: err => this.errorMessage = err
    });
  }
}
