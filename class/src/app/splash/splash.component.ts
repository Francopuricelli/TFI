import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {
  frames: string[] = [
    'assets/splash.gif'
  ];
  currentFrame: string = this.frames[0];
  private index = 0;

  ngOnInit() {
    setInterval(() => {
      this.index = (this.index + 1) % this.frames.length;
      this.currentFrame = this.frames[this.index];
    }, 200); // cada 200ms cambia de sprite
  }
}
