import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { KnightService } from 'src/_services/knight/knight.service';
import { Knight } from 'src/_models/knight.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-knight',
  templateUrl: './create-knight.component.html',
  styleUrls: ['./create-knight.component.css']
})
export class CreateKnightComponent {
  knight: Knight = new Knight("");
  constructor(
    private knightService: KnightService,
    private _snackBar: MatSnackBar
  ) {
  }
  handleWeaponChanged(event: any) {
    this.knight.weapons = event
  }
  onSubmit(stepper: any) {
    this.knightService.createKnight(this.knight).subscribe(response => {
      this._snackBar.open("Knight criado com sucesso", 'OK',  { duration: 3500 })
      stepper.reset()
    }, error => {
      this._snackBar.open("Não foi possível criar o Guerreiro", 'OK',  { duration: 3000 })
    });
  }

}
