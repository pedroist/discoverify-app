import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customize-panel',
  templateUrl: './customize-panel.component.html',
  styleUrls: ['./customize-panel.component.scss']
})
export class CustomizePanelComponent implements OnInit {
  slideToggleButtonColor: string = "primary";

  constructor() { }

  ngOnInit() {
  }

  onSlideToggleChange() {
    console.log("Toggled");
  }
}
