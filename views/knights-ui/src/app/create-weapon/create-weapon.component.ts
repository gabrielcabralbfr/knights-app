import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Weapon } from 'src/_models/weapon.model';

@Component({
  selector: 'app-create-weapon',
  templateUrl: './create-weapon.component.html',
  styleUrls: ['./create-weapon.component.css']
})
export class CreateWeaponComponent implements OnInit {
  public weapon: Weapon = new Weapon();
  constructor() { }
  @Output() weaponChanged = new EventEmitter<any>()

  ngOnInit() {
  }

  sendWeapon(event: any) {
    this.weaponChanged.emit(this.weapon)
  }

}
