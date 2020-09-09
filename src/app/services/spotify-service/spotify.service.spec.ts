import { TestBed, async, getTestBed } from '@angular/core/testing';
import { SpotifyService } from './spotify.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, throwError } from 'rxjs';

const mockResponse = {};

describe('SpotifyService', () => {
  let injector: TestBed;
  let service: SpotifyService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: []
    }).compileComponents()
    .then(() => {
        injector = getTestBed();
        httpClient = injector.get(HttpClient);
        httpMock = injector.get(HttpTestingController);
        service = injector.get(SpotifyService);
    });
  }));

  it('should create the app', () => {
    service = new SpotifyService(httpClient);
    expect(service).toBeTruthy();
  });

  // PRIMEIRO JEITO DE FAZER
  it(`Dado o SpotifyService
      Quando o método searchMusic retornar com sucesso
      Então deve retornar as músicas 1`, () => {
    let searchMusicResponse;
    const musicSearch = "Gorillaz";

    spyOn(httpClient,'get').and.returnValue(of(mockResponse));

    const params = {q: musicSearch, type: 'track'}; 
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${service.SPOTIFY_AUTH}`);

    service.searchMusic(musicSearch).subscribe((res) => {
      searchMusicResponse = res;
    });

    expect(searchMusicResponse).toEqual(mockResponse);
    expect(httpClient.get).toHaveBeenCalledWith('https://api.spotify.com/v1/search', { headers, observe: 'response', params });
  });

  // SEGUNDO JEITO DE FAZER
  it(`Dado o SpotifyService
      Quando o método searchMusic retornar com sucesso
      Então deve retornar as músicas 2`, () => {

    const musicSearch = "Gorillaz";
  
    service.searchMusic('Gorillaz').subscribe((res) => {      
      expect(res.body).toEqual(mockResponse);
    });

    const params = { q: musicSearch, type: 'track' }; 
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${service.SPOTIFY_AUTH}`);

    const reqMock = httpMock.expectOne((req) => {
      console.log(req.headers);
      return req.method === 'GET' && 
      req.urlWithParams === `https://api.spotify.com/v1/search?q=${params.q}&type=${params.type}`
    });
    
    reqMock.flush(mockResponse);
    httpMock.verify();
  });

  it(`Dado o SpotifyService
      Quando o método searchMusic retornar com erro
      Então deve repassar o erro`, () => {
    let searchMusicResponse;

    spyOn(httpClient,'get').and.returnValue(throwError({ status: 400 }));

    service.searchMusic('Gorillaz').subscribe(() => {}, (err) => {
      searchMusicResponse = err
    });

    expect(searchMusicResponse).toEqual({ status: 400 });
  });
});
 