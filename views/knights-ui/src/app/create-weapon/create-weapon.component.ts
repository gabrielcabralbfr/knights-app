import { Component, OnInit } from '@angular/core';
import { Weapon } from 'src/_models/weapon.model';

@Component({
  selector: 'app-create-weapon',
  templateUrl: './create-weapon.component.html',
  styleUrls: ['./create-weapon.component.css']
})
export class CreateWeaponComponent implements OnInit {
  public weapon: Weapon = new Weapon();
  constructor() { }

  ngOnInit() {
  }

}
