import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStorageModel } from '../models/auth-storage-model';
import { SignInCredentialsModel } from '../models/sign-in-credentials-model';
import { WebStorageService } from './web-storage.service';

const users = new Map<string, string>([['TESTING', 'Testing2020']]);

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private storageService: WebStorageService) {}

  login(credentials: SignInCredentialsModel | undefined): Observable<boolean> {
    return new Observable((subscriber) => {
      // Authentication data are stored
      if (this.storageService.getItem('app-AUTH')) {
        const authData = <AuthStorageModel>(
          JSON.parse(this.storageService.getItem('app-AUTH'))
        );
        if (this.checkToken(authData.token)) {
          subscriber.next(true);
        } else {
          subscriber.next(false);
        }
      }

      // No credentials provided
      else if (!credentials) {
        subscriber.next(false);
      }
      // The user is registered
      else if (users.has(credentials.login)) {
        // The passwords match
        if (users.get(credentials.login) === credentials.password) {
          // Dummy token
          const authData: AuthStorageModel = {
            login: credentials.login,
            token: '123456789ABCDEF',
          };

          this.storageService.clearStorage();
          this.storageService.setItem('app-AUTH', JSON.stringify(authData));
          subscriber.next(true);
        }
      } else {
        // The user is not registered or the password is wrong
        subscriber.next(false);
      }
    });
  }

  private checkToken(token: string): boolean {
    return token ? true : false;
  }
}
