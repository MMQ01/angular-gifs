import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent  {

  constructor(private gifservice:GifsService) { }

  get resultados(){
    return this.gifservice.resultados
  }
  
}
