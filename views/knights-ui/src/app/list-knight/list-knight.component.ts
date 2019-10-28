import { Component, OnInit } from '@angular/core';
import { KnightService } from 'src/_services/knight/knight.service';

@Component({
  selector: 'app-list-knight',
  templateUrl: './list-knight.component.html',
  styleUrls: ['./list-knight.component.css']
})
export class ListKnightComponent implements OnInit {

  public knightsList = []
  public isLoading: boolean;

  constructor(private knightService: KnightService) { 
    this.isLoading = true
  }
  ngOnInit(): void {
    this.knightService.getAllKnights().subscribe(response => {
      this.knightsList = response
      this.isLoading = false
    })
  }

  deleteKnight(id: string): void {
    const knightToBeDeleted = this.knightsList.filter(knight => knight.id == id)
    console.log("To be deleted", knightToBeDeleted);
    
    this.knightService.deleteKnight(id).subscribe(response => {
      this.knightsList.slice(this.knightsList.indexOf(knightToBeDeleted))
      console.log('After deletion', this.knightsList);
      
    }, error => {
      console.log("Náo foi possivel deleter o knight");
      
    })
  }

}
