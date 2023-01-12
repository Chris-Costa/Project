import { CalcService } from "./calculator.service";

describe('CalcService', () => {
    let service: CalcService

    beforeEach(() => {
        service = new CalcService();
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
      });

    it('daily calories should be undefined', () => {
        expect(service.dailyCalories).toBe(undefined);
    })
})