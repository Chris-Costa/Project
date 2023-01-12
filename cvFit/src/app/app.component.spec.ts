import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let component: AppComponent
  let guardConfig;
  let mockMsalService;
  let mockMsalBroadcastService;
  let dialog;

  beforeEach(async () => {
    guardConfig = jasmine.createSpyObj(['ob']);
    mockMsalService = jasmine.createSpyObj(['loginRedirect', 'logoutRedirect']);
    mockMsalBroadcastService = jasmine.createSpyObj(['observable']);
    dialog = jasmine.createSpyObj(['open']);
       
    component = new AppComponent(guardConfig, mockMsalService, mockMsalBroadcastService, dialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});