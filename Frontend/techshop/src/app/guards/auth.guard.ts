import { CanActivateFn } from '@angular/router';
import { globalVars } from '../../utils/global';

export const authGuard: CanActivateFn = (route, state) => {
  return globalVars.customerAccess;
};
