import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { KnightService } from 'src/_services/knight/knight.service';
import { Knight } from 'src/_models/knight.model';

@Component({
  selector: 'app-create-knight',
  templateUrl: './create-knight.component.html',
  styleUrls: ['./create-knight.component.css']
})
export class CreateKnightComponent {
  knight: Knight = new Knight("");
  constructor(
    private knightService: KnightService
  ) {
  }
  handleWeaponChanged(event: any) {
    this.knight.weapons = event
  }
  onSubmit() {
    console.log(this.knight);
    this.knightService.createKnight(this.knight).subscribe(response => {
      // TODO: SNACKBAR INFORMANDO SUCESSO

      console.log(response)
    }, error => {
      // TODO: SNACKBAR INFORMANDO ERRO

    });
  }

}
