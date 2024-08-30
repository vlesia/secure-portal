import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor(
    private auth: Auth,
    private router: Router,
    private loading: LoadingService
  ) {
    this.loading.setLoading(true);
    this.auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        this.user$.next({
          email: firebaseUser.email || '',
        });
        this.router.navigate(['/account']);
      } else {
        this.user$.next(null);
        this.router.navigate(['/login']);
      }
      this.loading.setLoading(false);
    });
  }

  login(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {})
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  register(email: string, password: string): Promise<void> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {})
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.asObservable().pipe(
      map((user) => {
        return !!user;
      })
    );
  }

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
