import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify-service/spotify.service';

@Component({
  selector: 'app-search-music',
  templateUrl: './search-music.component.html',
  styleUrls: ['./search-music.component.css']
})
export class SearchMusicComponent implements OnInit {
  value = 'Pesquise uma música';
  
  errorMessage = '';

  tracks;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
  }

  clickAction() {    
    this.spotifyService.searchMusic(this.value).subscribe(
      (response) => {
        this.tracks = response.body.tracks.items;        
      },

      errorResponse => {
        this.errorMessage = errorResponse.message;
      }
    );
  }

}
