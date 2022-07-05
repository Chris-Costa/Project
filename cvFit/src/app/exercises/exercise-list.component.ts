import { Component } from '@angular/core';

@Component({
    selector: 'app-exercises',
    templateUrl: './exercise-list.component.html'
})
export class ExerciseListComponent{
    pageTitle: string = 'Exerciese List';
    imageWidth: number =50;
    imageMargin: number= 2;
    exercises: any[] = [
        {
            "exerciseName": "Rows",
            "group": "back",
            "description": "Cable or dumbell row",
            "repRange": "8-12",
            "starRating": 4.1,
            "imageUrl": "assets/images/Row.png"
        },
        {
            "exerciseName": "Lat Pull Down",
            "group": "back",
            "description": "Cable",
            "rep range": "8-12",
            "star rating": 4.5,
            "imageUrl": "assets/images/LatPulldown.webp"
        }
    ];
}