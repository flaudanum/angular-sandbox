import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { AuthStorageModel } from '../models/auth-storage-model';
import { SignInCredentialsModel } from '../models/sign-in-credentials-model';
import { WebStorageService } from './web-storage.service';

// This data should be on the backend server
const users = new Map<string, string>([['TESTING', 'TestingSandBox21']]);
/* Token's payload
  {
    "sub": "1234567890",
    "name": "Testing",
    "iat": 1612432959, (feb-04-2021)
    "iss": "The fake backend",
    "exp": 1770220959  (+5 years)
  }
 */
const fakeToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3RpbmciLCJpYXQiOjE2MTI0MzI5NTksImlzcyI6IlRoZSBmYWtlIGJhY2tlbmQiLCJleHAiOjE3NzAyMjA5NTl9.xsKcgc3AwCXRETUBUdV7VM6bC7VRPJB_71-8WoUixNc';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private static webStorageNames = new Map([['AUTH', 'sandbox-AUTH']]);

  constructor(private storageService: WebStorageService) {}

  login(credentials: SignInCredentialsModel | undefined): Observable<boolean> {
    return new Observable((subscriber) => {
      // Authentication data are stored
      if (this.storageService.getItem(this.getStorageName('AUTH'))) {
        this.checkTokenInStorage(subscriber);
      }

      // No credentials provided
      else if (!credentials) {
        subscriber.next(false);
      }
      // The user is registered
      else if (users.has(credentials.login)) {
        this.validateCredentials(credentials, subscriber);
      } else {
        // The user is not registered or the password is wrong
        subscriber.next(false);
      }
    });
  }

  signOut(): Observable<boolean> {
    return new Observable((subscriber) => {
      this.storageService.clearStorage();
      subscriber.next(true);
    });
  }

  private getStorageName(name: string) {
    if (AuthenticationService.webStorageNames.has(name)) {
      return AuthenticationService.webStorageNames.get(name);
    } else {
      throw Error(`Unregistered web storage name: ${name}`);
    }
  }

  private validateCredentials(
    credentials: SignInCredentialsModel,
    subscriber: Subscriber<boolean>
  ) {
    // The passwords match
    if (users.get(credentials.login) === credentials.password) {
      this.getToken(credentials.login).then((token) => {
        // Dummy token
        const authData: AuthStorageModel = {
          login: credentials.login,
          token,
        };

        this.storageService.clearStorage();
        this.storageService.setItem(
          this.getStorageName('AUTH'),
          JSON.stringify(authData)
        );
        subscriber.next(true);
      });
    } else {
      subscriber.next(false);
    }
  }

  private checkTokenInStorage(subscriber: Subscriber<boolean>) {
    const authData = <AuthStorageModel>(
      JSON.parse(this.storageService.getItem(this.getStorageName('AUTH')))
    );
    if (this.checkToken(authData.token)) {
      subscriber.next(true);
    } else {
      subscriber.next(false);
    }
  }

  private checkToken(token: string): boolean {
    return token ? true : false;
  }

  private getToken(login: string): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(fakeToken);
    });
  }
}
