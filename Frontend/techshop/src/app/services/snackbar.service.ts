import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
/**
 * To avoid writing the same method for snackbar
 */
export class SnackbarService {
  constructor(private snacbar: MatSnackBar) {}

  openSnackBar(msg: string): void {
    this.snacbar.open(msg, 'close', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
