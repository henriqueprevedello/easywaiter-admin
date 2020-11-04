import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  exibir(mensagem: string) {
    this._snackBar.open(mensagem, '', {
      duration: 4000,
      horizontalPosition : 'center',
      verticalPosition: 'top',
    });
  }
}
