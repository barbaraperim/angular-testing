import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { SearchMusicComponent } from './search-music.component';
import { SpotifyService } from '../services/spotify-service/spotify.service';
import { Observable, of, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { TrackItemComponent } from '../track-item/track-item.component';
import { MockComponent } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MockTestService {
  searchMusic(): Observable<any> { return null; }
}

describe('SearchMusicComponent', () => {
  let injector: TestBed;
  let component: SearchMusicComponent;
  let fixture: ComponentFixture<SearchMusicComponent>;
  let spotifyService: SpotifyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatInputModule, MatFormFieldModule, MatIconModule, FormsModule, BrowserAnimationsModule],
      declarations: [ SearchMusicComponent, MockComponent(TrackItemComponent) ],
      providers: [
        { provide: SpotifyService, useClass: MockTestService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(SearchMusicComponent);
    component = fixture.componentInstance;
    spotifyService = injector.get(SpotifyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Dado a pesquisa
      Quando for executada com sucesso
      Deve retornar os nomes das musicas`, () => {

    const mockResponse = {
        tracks: {
          items: [
            { name: 'Track Name'}
          ]
        }
    };

    spyOn(spotifyService, 'searchMusic').and.returnValue(of(new HttpResponse({body: mockResponse})));
    
    const button = fixture.nativeElement.querySelector('.btn');
    component.value = 'Gorillaz';

    button.click();
    fixture.detectChanges();

    const trackItem = fixture.debugElement.query(By.directive(MockComponent(TrackItemComponent)));

    expect(spotifyService.searchMusic).toHaveBeenCalledTimes(1);
    expect(spotifyService.searchMusic).toHaveBeenCalledWith("Gorillaz");
    expect(trackItem).toBeTruthy();
  });

  it(`Dado a pesquisa
      Quando for executada com erro
      Deve retornar uma mensagem de erro`, () => {
    const errorResponse = {
      status: 400,
      message: 'Falha ao realizar chamada'
    };

    const button = fixture.nativeElement.querySelector('.btn');

    spyOn(spotifyService, 'searchMusic').and.returnValue(throwError(errorResponse));
    button.click();
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.error');
    expect(spotifyService.searchMusic).toHaveBeenCalledTimes(1);
    expect(error.textContent).toContain(errorResponse.message);
  });
});
