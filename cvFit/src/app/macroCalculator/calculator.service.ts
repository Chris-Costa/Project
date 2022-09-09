import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class CalcService {
    dailyCalories: number = undefined;

    calculateBMR_male(macroForm: FormGroup){
        enum maleBMRMultipliers{
            inchConverter = 12,
            heightMultiplier = 12.7,
            weightMultiplier = 6.23,
            ageMultiplier = 6.8,
            additioinalValue = 66
        }
        return (((macroForm.get('heightF').value * maleBMRMultipliers.inchConverter) + macroForm.get('heightI').value) * maleBMRMultipliers.heightMultiplier) + (macroForm.get('weight').value * maleBMRMultipliers.weightMultiplier) - (macroForm.get('age').value * maleBMRMultipliers.ageMultiplier) + maleBMRMultipliers.additioinalValue
    }
    calculateBMR_female(macroForm: FormGroup){
        enum femaleBMRMulitpliers{
            inchConverter = 12,
            heightMultiplier = 4.7,
            weightMultiplier = 4.35,
            ageMultiplier = 4.7,
            additioinalValue = 655
        }
        return (((macroForm.get('heightF').value * femaleBMRMulitpliers.inchConverter) + macroForm.get('heightI').value) * femaleBMRMulitpliers.heightMultiplier) + (macroForm.get('weight').value * femaleBMRMulitpliers.weightMultiplier) - (macroForm.get('age').value * femaleBMRMulitpliers.ageMultiplier) + femaleBMRMulitpliers.additioinalValue
    }
    calculateDailyCalories(num: number, currentBMR: number){
        enum exerciseMultipliers{
            noExercise = 1.2,
            moderateExercise = 1.375,
            consistantExercise = 1.55,
            intenseExercise = 1.725
        }
        if (num == 1){
            return currentBMR * exerciseMultipliers.noExercise;
        }
        else if (num == 2){
            return currentBMR * exerciseMultipliers.moderateExercise;
        }
        else if (num == 3){
            return currentBMR * exerciseMultipliers.consistantExercise;
        }
        else if (num == 4){
            return currentBMR * exerciseMultipliers.intenseExercise;
        }
        else 
            console.log('Error with activity');
            return -1;
    }
    goalFactor(num: number, calories: number){
        enum goalMulitipliers{
            calorieAdjustment = 500,
            carbsPercentage = 0.4,
            maintainCarbsPercentage = 0.5,
            fatPercentage = 0.3,
            protienPercentage = 0.3,
            maintainProtienPercentage = 0.2,
            carbDivisor = 4,
            fatDivisor = 9,
            protienDivisor = 4
        }
        if(num == 1){
            this.dailyCalories = Math.round(calories) - goalMulitipliers.calorieAdjustment
            return [
                this.dailyCalories,
                Math.round((this.dailyCalories * goalMulitipliers.carbsPercentage) / goalMulitipliers.carbDivisor),
                Math.round((this.dailyCalories * goalMulitipliers.fatPercentage) / goalMulitipliers.fatDivisor),
                Math.round((this.dailyCalories * goalMulitipliers.protienPercentage) / goalMulitipliers.protienDivisor)
            ];
        }
        else if(num == 2){
            return [
                Math.round(calories),
                Math.round((calories * goalMulitipliers.maintainCarbsPercentage) / goalMulitipliers.carbDivisor),
                Math.round((calories * goalMulitipliers.fatPercentage) / goalMulitipliers.fatDivisor),
                Math.round((calories * goalMulitipliers.maintainProtienPercentage) / goalMulitipliers.protienDivisor)
            ];
        }
        else if(num == 3){
            this.dailyCalories = Math.round(calories) + goalMulitipliers.calorieAdjustment
            return [
                this.dailyCalories,
                Math.round((this.dailyCalories * goalMulitipliers.carbsPercentage) / goalMulitipliers.carbDivisor),
                Math.round((this.dailyCalories * goalMulitipliers.fatPercentage) / goalMulitipliers.fatDivisor),
                Math.round((this.dailyCalories * goalMulitipliers.protienPercentage) / goalMulitipliers.protienDivisor)
            ];
        }
        else {
            console.log('Error with goal');
            return [];
        }  
    }
}