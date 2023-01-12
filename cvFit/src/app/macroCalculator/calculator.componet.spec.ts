import { CalculatorComponent } from "./calculator.component";

describe('Calculator Component', () => {
    let component: CalculatorComponent
    let mockCalcService;

    beforeEach(() => {
        mockCalcService = jasmine.createSpyObj(['calculateBMR_male', 'calculateBMR_female', 'calculateDailyCalories', 'goalFactor']);
       
        component = new CalculatorComponent(mockCalcService);

    })

    it('should create', () => {
        expect(component).toBeTruthy();
    });
})

