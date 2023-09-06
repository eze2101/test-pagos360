import { Injectable } from '@angular/core';
import { SignalStore } from './signalStore';
import { User } from '../shared/interfaces/user.interface';
import { Report } from '../shared/interfaces/table.interface';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService extends SignalStore<User> {
  constructor() {
    super();
  }
}

@Injectable({
  providedIn: 'root',
})
export class LoadingStoreService extends SignalStore<boolean> {
  constructor() {
    super();
    this.setState(false);
  }
}

@Injectable({
  providedIn: 'root',
})
export class ReportStoreService extends SignalStore<Report[]> {
  constructor() {
    super();
  }
}
