import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User, Course, StudentCalendar } from 'app/app.component';

@Injectable({providedIn: 'root'})
export class IsLoggedService {
  constructor() { }
  isUserLoggedIn = new Subject();
  setUserLoggedIn(loggedIn: boolean) {
    return this.isUserLoggedIn.next(loggedIn);
  }
  userProfile = new Subject();
  setUserProfile(profile: string) {
    return this.userProfile.next(profile);
  }
  userData = new Subject();
  setUserData(userData: User) {
    return this.userData.next(userData);
  }
}
