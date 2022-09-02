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
    activity: number = 1; //part of dropdown
    activityL: activityLevel[] = [{value: 1, viewValue: "No exercise"}, {value: 2, viewValue: "Exercise 1-3 times a week"}, {value: 3, viewValue: "Exercise 4-5 times a week"}, {value: 4, viewValue: "Exercise 6-7 times a week"}]
    goal: number = 1; //part of dropdown
    goalW: weightGoal[] = [{value: 1, viewValue: "Weight loss"}, {value: 2, viewValue: "Maintain weight"}, {value: 3, viewValue: "Gain weight"}]

    //variables for results 
    protein: number =0;
    carbs: number =0;
    fat: number =0;
    dailyCals: number | undefined;
    
    showResult: boolean = false;
    bmr: number | undefined;
    
    submit(formValues: { age: number; gender: string; heightF: number; heightI: number; weight: number; activity: number; goal: number; }){
        
        this.showResult = true;
        this.age = formValues.age;
        this.gender = formValues.gender;
        this.heightF = formValues.heightF;
        this.heightI = formValues.heightI;
        this.weight = formValues.weight;
        
        if (this.gender == 'Male'){
            this.bmr = (((this.heightF * 12) + this.heightI) * 12.7) + (6.23 * this.weight) - (6.8 * this.age) + 66
            if (this.activity == 1){
                this.dailyCals = this.bmr * 1.2;
            }
            else if (this.activity == 2){
                this.dailyCals = this.bmr * 1.375;
            }
            else if (this.activity == 3){
                this.dailyCals = this.bmr * 1.55;
            }
            else if (this.activity == 4){
                this.dailyCals = this.bmr * 1.725;
            }
            else 
                console.log('Error with activity');


            if(this.goal == 1){
                this.dailyCals = Math.round(this.dailyCals) - 500;
                this.carbs = Math.round((this.dailyCals * 0.4) / 4);
                this.fat = Math.round((this.dailyCals * 0.3) / 9);
                this.protein = Math.round((this.dailyCals * 0.3) / 4);
            }
            else if(this.goal == 2){
                this.dailyCals = Math.round(this.dailyCals);
                this.carbs = Math.round((this.dailyCals * 0.5) / 4);
                this.fat = Math.round((this.dailyCals * 0.3) / 9);
                this.protein = Math.round((this.dailyCals * 0.2) / 4);
            }
            else if(this.goal == 3){
                this.dailyCals = Math.round(this.dailyCals) + 500;
                this.carbs = Math.round((this.dailyCals * 0.4) / 4);
                this.fat = Math.round((this.dailyCals * 0.3) / 9);
                this.protein = Math.round((this.dailyCals * 0.3) / 4);
            }
            
        }
        else{
            this.bmr = (((this.heightF * 12) + this.heightI) * 4.7) + (4.35 * this.weight) - (4.7 * this.age) + 655
            if (this.activity == 1){
                this.dailyCals = this.bmr * 1.2;
            }
            else if (this.activity == 2){
                this.dailyCals = this.bmr * 1.375;
            }
            else if (this.activity == 3){
                this.dailyCals = this.bmr * 1.55;
            }
            else if (this.activity == 4){
                this.dailyCals = this.bmr * 1.725;
            }
            else 
                console.log('error with activity')

            if(this.goal == 1){
                this.dailyCals = Math.round(this.dailyCals) - 500;
                this.carbs = Math.round((this.dailyCals * 0.4) / 4);
                this.fat = Math.round((this.dailyCals * 0.3) / 9);
                this.protein = Math.round((this.dailyCals * 0.3) / 4);
            }
            else if(this.goal == 2){
                this.dailyCals = Math.round(this.dailyCals);
                this.carbs = Math.round((this.dailyCals * 0.5) / 4);
                this.fat = Math.round((this.dailyCals * 0.3) / 9);
                this.protein = Math.round((this.dailyCals * 0.2) / 4);
            }
            else if(this.goal == 3){
                this.dailyCals = Math.round(this.dailyCals) + 500;
                this.carbs = Math.round((this.dailyCals * 0.4) / 4);
                this.fat = Math.round((this.dailyCals * 0.3) / 9);
                this.protein = Math.round((this.dailyCals * 0.3) / 4);
            }
        }
    }
}