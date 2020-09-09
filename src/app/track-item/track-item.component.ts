import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-item',
  templateUrl: './track-item.component.html',
  styleUrls: ['./track-item.component.css']
})
export class TrackItemComponent implements OnInit {
  @Input() trackName;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClickTrack() {
    this.router.navigate(['/teste']);
  }

}
