import { HomeComponent } from "./home.component";

describe('Home Component', () => {
    let component: HomeComponent;
    let mockMsalService;
    let mockMsalBroadcastService;
    let dialog;
  
    beforeEach(async () => {
      mockMsalService = jasmine.createSpyObj(['loginRedirect', 'logoutRedirect']);
      mockMsalBroadcastService = jasmine.createSpyObj(['observable']);
      dialog = jasmine.createSpyObj(['open']);
         
      component = new HomeComponent(mockMsalService, mockMsalBroadcastService, dialog);
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
});