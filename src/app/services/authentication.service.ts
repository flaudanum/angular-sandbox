import { Injectable } from '@angular/core';
import { SignInCredentialsModel } from '../models/sign-in-credentials-model';

const users = new Map<string, string>([['TESTING', 'Testing2020']]);

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  login(credentials: SignInCredentialsModel | undefined): Promise<boolean> {
    const checkCredentials = (
      resolve: (v: boolean) => void,
      reject: (r: string) => void
    ) => {
      // No credentials provided
      if (!credentials) {
        resolve(false);
      }
      // The user is registered
      if (users.has(credentials.login)) {
        // The passwords match
        if (users.get(credentials.login) === credentials.password) {
          resolve(true);
        }
      } else {
        // The user is not registered or the password is wrong
        resolve(false);
      }
    };
    return new Promise(checkCredentials);
  }
}
