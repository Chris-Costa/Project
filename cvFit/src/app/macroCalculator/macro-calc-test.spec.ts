import { FormGroup } from "@angular/forms";
import { CalcService } from "./calculator.service";

describe('CalcService', () => {
    

    let service: CalcService;
    

    beforeEach(() => {
        service = new CalcService();
    })

    it('should have no values to start', () => {
        expect(service.dailyCalories).toBe(null);
    })
    it('should return male bmr value when calculateBMR_male is called', () =>{
        //service.calculateBMR_male(service.)
    })
})