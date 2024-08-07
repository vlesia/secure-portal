import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor(private auth: Auth) {
    this.auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        this.user$.next({
          email: firebaseUser.email || '',
        });
      } else {
        this.user$.next(null);
      }
    });
  }

  login(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {})
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.asObservable().pipe(map((user) => !!user));
  }

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
