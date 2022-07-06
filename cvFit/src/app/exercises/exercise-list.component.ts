import { Component, OnInit, ɵisListLikeIterable } from '@angular/core';
import { IExercise } from './exercise';
import { ExerciseService } from './exercise.service';

@Component({
    selector: 'app-exercises',
    templateUrl: './exercise-list.component.html',
    styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {
    pageTitle: string = 'Exerciese List';
    imageWidth: number =50;
    imageMargin: number= 2;
    showImage: boolean = false;
    
    private _listFilter: string ="";
    errorMessage: any;
    get listFilter(): string{
        return this._listFilter
    }
    set listFilter(value: string){
        this._listFilter = value;
        console.log('In setter', value);
        this.filteredExercises = this.performFilter(value);
    }

    filteredExercises: IExercise[] = [];

    exercises: IExercise[] = [];

    constructor (private exerciseService: ExerciseService){

    }
    toggleImage(): void{
        this.showImage = !this.showImage;
    }
    ngOnInit(): void{
        this.exerciseService.getExercises().subscribe({
            next: exercises => {
                this.exercises = exercises;
                this.filteredExercises = this.exercises;
            },
            error: err => this.errorMessage = err
        });
        
    }
    performFilter(filterBy: string): IExercise[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.exercises.filter((exercise: IExercise) =>
            exercise.exerciseName.toLocaleLowerCase().includes(filterBy))
    }
}