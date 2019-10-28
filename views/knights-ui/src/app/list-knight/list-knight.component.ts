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
    }, error => {
      this.isLoading = false
      // TODO: SNACKBAR INFORMANDO ERRO
    })
  }

  deleteKnight(id: string): void {
    let knightToBeDeleted = this.knightsList.filter(knight => knight.id == id)
    knightToBeDeleted = knightToBeDeleted[0]
    console.log("To be deleted", knightToBeDeleted);
    
    this.knightService.deleteKnight(id).subscribe(response => {
      this.knightsList.splice(this.knightsList.indexOf(knightToBeDeleted), 1)
      console.log('After deletion', this.knightsList);
      
    }, error => {
      console.log("Náo foi possivel deleter o knight");
      // TODO: SNACKBAR INFORMANDO ERRO
      
    })
  }

}
