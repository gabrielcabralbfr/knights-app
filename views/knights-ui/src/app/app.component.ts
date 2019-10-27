import { Component, OnInit } from '@angular/core';
import { KnightService } from 'src/_services/knight/knight.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public knightsList = []

  constructor(private knightService: KnightService) { }
  ngOnInit(): void {
    this.knightService.getAllKnights().subscribe(response => {
      console.log(response);
      
      this.knightsList = response
    })
  }
}
