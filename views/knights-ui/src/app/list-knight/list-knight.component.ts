import { Component, OnInit } from '@angular/core';
import { KnightService } from 'src/_services/knight/knight.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-list-knight',
  templateUrl: './list-knight.component.html',
  styleUrls: ['./list-knight.component.css']
})
export class ListKnightComponent implements OnInit {

  public knightsList = []
  public isLoading: boolean;

  constructor(
    private knightService: KnightService,
    private _snackBar: MatSnackBar
  ) {
    this.isLoading = true
  }
  ngOnInit(): void {
    this.knightService.getAllKnights().subscribe(response => {
      this.knightsList = response
      this.isLoading = false
    }, error => {
      this.isLoading = false
      this._snackBar.open("Não foi possivel obter a lista de Knights", 'OK', { duration: 2500 })
    })
  }

  deleteKnight(id: string): void {
    let knightToBeDeleted = this.knightsList.filter(knight => knight.id == id)
    knightToBeDeleted = knightToBeDeleted[0]
    this.knightService.deleteKnight(id).subscribe(response => {
      this.knightsList.splice(this.knightsList.indexOf(knightToBeDeleted), 1)
      this._snackBar.open("Knight deletado com sucesso", 'OK', { duration: 2500 })

    }, error => {
      this._snackBar.open("Náo foi possivel deleter o knight", 'OK', { duration: 2500 })
    })
  }

}
