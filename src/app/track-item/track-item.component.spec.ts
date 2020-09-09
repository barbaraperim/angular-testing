import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { TrackItemComponent } from './track-item.component';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const routes: Routes = [
  { path: 'teste', component: TrackItemComponent },
];

describe('TrackItemComponent', () => {
  let component: TrackItemComponent;
  let fixture: ComponentFixture<TrackItemComponent>;
  let router: Router;
  let injector: TestBed;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackItemComponent ],
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(TrackItemComponent);
    component = fixture.componentInstance;
    router = injector.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Dado um track-item
      Quando for clicado
      Deve redirecionar pra rota 'teste'`, () => {
    spyOn(router, 'navigate');

    const trackItem = fixture.nativeElement.querySelector('.track-item');
      
    trackItem.click();

    expect(router.navigate).toHaveBeenCalledWith(['/teste']);
  });
});
