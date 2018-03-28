import { Component, OnInit, EventEmitter,  Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DinnerbellService } from '../../services/dinnerbell.service'
import { AuthService } from '../../services/auth.service'
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-menu-header',
  templateUrl: 'menu.header.component.html'
})
export class MenuHeaderComponent implements OnInit {
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
}
