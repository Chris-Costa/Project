import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { CalcService } from "./calculator.service";

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
export class CalculatorComponent implements OnInit{
    constructor(private calcService: CalcService) { }
    macroForm: FormGroup;
    showResult: boolean = false;
    activityL: activityLevel[] = [{value: 1, viewValue: "No exercise"}, {value: 2, viewValue: "Exercise 1-3 times a week"}, {value: 3, viewValue: "Exercise 4-5 times a week"}, {value: 4, viewValue: "Exercise 6-7 times a week"}]
    goalW: weightGoal[] = [{value: 1, viewValue: "Weight loss"}, {value: 2, viewValue: "Maintain weight"}, {value: 3, viewValue: "Gain weight"}]
    goal: number | undefined;
    //variables for results 
    bmr: number | undefined;
    dailyCals: number | undefined;
    goalResults: number[] | undefined;
    carbs: number = 0;
    fat: number = 0;
    protein: number = 0;

    ngOnInit(): void {
        let age = new FormControl();
        let gender = new FormControl();
        let heightF = new FormControl();
        let heightI = new FormControl();
        let weight = new FormControl();
        let activityLevel = new FormControl();
        let weightGoal = new FormControl();
        this.macroForm = new FormGroup({
            age: age,
            gender: gender,
            heightF: heightF,
            heightI: heightI,
            weight: weight,
            activityLevel: activityLevel,
            weightGoal: weightGoal
        })
    }
    
    submit(){;
        this.goal = this.macroForm.get('weightGoal').value //used in html (not sure how to access the form value in the html)
        this.showResult = true;

        if (this.macroForm.get('gender').value == 'Male'){
            this.bmr = this.calcService.calculateBMR_male(this.macroForm)
            this.dailyCals = this.calcService.calculateDailyCalories(this.macroForm.get('activityLevel').value, this.bmr)
            this.goalResults = this.calcService.goalFactor(this.macroForm.get('weightGoal').value, this.dailyCals)
            this.dailyCals = this.goalResults[0];
            this.carbs = this.goalResults[1];
            this.fat = this.goalResults[2];
            this.protein = this.goalResults[3];
        }
        else if (this.macroForm.get('gender').value == 'Female'){
            this.dailyCals = this.calcService.calculateDailyCalories(this.macroForm.get('activityLevel').value, this.bmr);
            this.goalResults = this.calcService.goalFactor(this.macroForm.get('weightGoal').value, this.dailyCals);
            this.dailyCals = this.goalResults[0];
            this.carbs = this.goalResults[1];
            this.fat = this.goalResults[2];
            this.protein = this.goalResults[3];
        }
        else
            console.log('error with gender')
    }
}