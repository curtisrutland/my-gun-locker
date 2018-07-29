import { Injectable } from '@angular/core';
import { NavAction } from '../models/navAction';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class NavbarService {

  constructor() { }

  private actions: NavAction[] = [];

  private _actions$ = new Subject<NavAction[]>();
  actions$ = this._actions$.asObservable();

  setActions(actions: NavAction[]) {
    if(actions == null) {
      actions = [];
    }
    this.actions = actions;
    this._actions$.next(this.actions);
  }

  clearActions() {
    this.setActions([]);
  }
}