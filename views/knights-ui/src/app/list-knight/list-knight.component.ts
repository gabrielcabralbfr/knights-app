import { Component, OnInit } from '@angular/core';
import { KnightService } from 'src/_services/knight/knight.service';
import { MatSnackBar } from '@angular/material';
import { Knight } from 'src/_models/knight.model';

@Component({
  selector: 'app-list-knight',
  templateUrl: './list-knight.component.html',
  styleUrls: ['./list-knight.component.css']
})
export class ListKnightComponent implements OnInit {

  public knightsList = []
  public isLoading: boolean;
  public inputSize: number = 2;

  constructor(
    private _knightService: KnightService,
    private _snackBar: MatSnackBar
  ) {
    this.isLoading = true
  }
  ngOnInit(): void {
    this._knightService.getAllKnights().subscribe(response => {
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
    this._knightService.deleteKnight(id).subscribe(response => {
      this.knightsList.splice(this.knightsList.indexOf(knightToBeDeleted), 1)
      this._snackBar.open("Knight deletado com sucesso! Agora ele se tornou um herói", 'OK', { duration: 2500 })
    }, error => {
      this._snackBar.open("Náo foi possivel deleter o knight", 'OK', { duration: 2500 })
    })
  }

  editKnight(knight: Knight): void {
    let index = this.knightsList.indexOf(knight);

    if (this.knightsList[index].isEditing) {
      this.knightsList[index].isEditing = false
    } else {
      this.knightsList[index].isEditing = true
      setTimeout(() => {
        document.getElementById('editInput').focus()
      }, 150);
    }

    this.inputSize = this.knightsList[index].apelido.length + 1
  }

  finishEdition(knight: Knight): void {
    let newNickname = (document.getElementById('editInput') as HTMLInputElement).value
    this._knightService.updateKnight({ nickname: newNickname, id: knight.id }).subscribe(response => {
      let index = this.knightsList.indexOf(knight);
      this.knightsList[index].isEditing = this.knightsList[index].isEditing ? false : true
      this.knightsList[index].apelido = newNickname
      this.inputSize = newNickname.length + 1
    }, error => {
      this._snackBar.open("Náo foi possivel editar o apelido do knight", 'OK', { duration: 2500 })
    })
  }

  updateInputLength(event: any) {
    this.inputSize = event.target.value.length
  }

  handleSlideChange(event: any) {
    this.isLoading = true
    let queryString = ''
    if (event.checked) queryString = `?filter=heroes`
    this._knightService.getAllKnights(queryString).subscribe(response => {
      this.knightsList = response
      this.isLoading = false
    })
  }
}