import { Component } from "@angular/core";
interface activityLevel{
    value: number;
    viewValue: string;
}
interface weightGoal{
    value: number;
    viewValue: string;
}
@Component({
    selector: 'calculator-component',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent{
    //variables for calculations
    age: number | undefined;
    gender: string | undefined; 
    genders: string[] = ["Male", "Female"];
    heightF: number | undefined;
    heightI: number | undefined;
    weight: number | undefined;
    activity: number | undefined; //part of dropdown
    activityL: activityLevel[] = [{value: 1, viewValue: "No exercise"}, {value: 2, viewValue: "Exercise 1-3 times a week"}, {value: 3, viewValue: "Exercise 4-5 times a week"}, {value: 4, viewValue: "Exercise 6-7 times a week"}]
    goal: number | undefined; //part of dropdown
    goalW: weightGoal[] = [{value: 1, viewValue: "Weight loss"}, {value: 2, viewValue: "Maintain weight"}, {value: 3, viewValue: "Gain weight"}]

    //variables for results 
    protein: number | undefined;
    carbs: number | undefined;
    fat: number | undefined;
    sugar: number | undefined;
    satFat: number | undefined;
    foodEnergy: number | undefined;
    dailyCals: number | undefined;
    
    showResult: boolean = false;
    
    submit(formValues: { age: number; gender: string; heightF: number; heightI: number; weight: number; activity: number; goal: number; }){
        
        this.showResult = true;
        this.age = formValues.age;
        this.gender = formValues.gender;
        this.heightF = formValues.heightF;
        this.heightI = formValues.heightI;
        this.weight = formValues.weight;
        if (this.goal == 2){
            this.carbs = 287.5;
            this.protein = 143.75;
            this.fat = 63.8;
        }
    }  
}