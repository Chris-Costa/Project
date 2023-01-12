import { of } from "rxjs";
import { ExerciseDetailComponent } from "./exercise-detail.component";

describe('Exercise-Detail Component', () => {
    let component: ExerciseDetailComponent;
    let router;
    let mockExerciseService;
    let sanitizer;
  
    beforeEach(async () => {
      router = jasmine.createSpyObj(['navigate']);
      mockExerciseService = jasmine.createSpyObj('Service', {
        'retrieveData1': of('mock data'),
        'other': 'some val'
      });
      sanitizer = jasmine.createSpyObj(['bypassSecurityTrustResourceUrl']);
         
      component = new ExerciseDetailComponent(router, mockExerciseService, sanitizer);
    });
  
    it('should-create', () => { 
      expect(component).toBeTruthy();
    });
  
});
