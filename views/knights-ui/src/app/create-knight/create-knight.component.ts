import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { KnightService } from 'src/_services/knight/knight.service';
import { Knight } from 'src/_models/knight.model';

@Component({
  selector: 'app-create-knight',
  templateUrl: './create-knight.component.html',
  styleUrls: ['./create-knight.component.css']
})
export class CreateKnightComponent implements OnInit {
  value;
  knight: Knight = new Knight("");
  constructor(
    private knightService: KnightService
  ) {
  }

  ngOnInit() {
  }

  onSubmit(knightData) {
    // Process checkout data here
    console.warn('Your order has been submitted', knightData);

    // this.items = this.knightService.createKnight({});
    // this.checkoutForm.reset();
  }

}
