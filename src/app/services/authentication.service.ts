import { Injectable } from '@angular/core';
import { AuthStorageModel } from '../models/auth-storage-model';
import { SignInCredentialsModel } from '../models/sign-in-credentials-model';
import { WebStorageService } from './web-storage.service';

const users = new Map<string, string>([['TESTING', 'Testing2020']]);

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private storageService: WebStorageService) {}

  login(credentials: SignInCredentialsModel | undefined): Promise<boolean> {
    const checkCredentials = (
      resolve: (v: boolean) => void,
      reject: (r: string) => void
    ) => {
      // Authentication data are stored
      if (this.storageService.getItem('app-AUTH')) {
        const authData = <AuthStorageModel>(
          JSON.parse(this.storageService.getItem('app-AUTH'))
        );
        console.log('CHECK');
        console.log(authData);
        if (this.checkToken(authData.token)) {
          resolve(true);
        } else {
          resolve(false);
        }
      }

      // No credentials provided
      else if (!credentials) {
        resolve(false);
      }
      // The user is registered
      else if (users.has(credentials.login)) {
        // The passwords match
        if (users.get(credentials.login) === credentials.password) {
          resolve(true);

          // Dummy token
          const authData: AuthStorageModel = {
            login: credentials.login,
            token: '123456789ABCDEF',
          };

          this.storageService.clearStorage();
          this.storageService.setItem('app-AUTH', JSON.stringify(authData));
        }
      } else {
        // The user is not registered or the password is wrong
        resolve(false);
      }
    };
    return new Promise(checkCredentials);
  }

  private checkToken(token: string): boolean {
    return token ? true : false;
  }
}
