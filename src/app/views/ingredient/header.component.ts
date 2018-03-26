import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingredient-header',
  templateUrl: 'header.component.html'
})
export class IngredientHeaderComponent implements OnInit {
  current_mode: string
  @Output() onViewModeChange = new EventEmitter<boolean>();
  constructor( ) { }
  ngOnInit() {
    this.current_mode = 'list'
  }
  onSelectViewMode($event) {
    this.onViewModeChange.emit($event)
    this.current_mode = $event
  }
  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }
}
