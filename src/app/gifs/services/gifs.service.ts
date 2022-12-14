import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'AdWgVX8BhbQXB4YKTtdr9W2PlDiL2uHI';
  private servicioUrl:string ='https://api.giphy.com/v1/gifs'
  private _historial: string[]=[];
 

  public resultados: Gif[]=[]

  get historial(){
    
    return [...this._historial]
  }

  constructor(private http:HttpClient){
    if(localStorage.getItem('historial')){
      this._historial=JSON.parse(localStorage.getItem('historial')! )
    }
    if(localStorage.getItem('resultado')){
      this.resultados=JSON.parse(localStorage.getItem('resultado')! )
    }
  }

  buscarGifs( query:string){
    query=query.trim().toLocaleLowerCase()
 
    if( !this._historial.includes(query)){
      this._historial.unshift(query)
          //corta un vector 
      this._historial = this._historial.splice(0,10)
      localStorage.setItem('historial',JSON.stringify( this._historial))
    }

    const params= new HttpParams()
          .set('apikey',this.apiKey)
          .set('limit', '10')
          .set('q', query);


    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params:params})
    .subscribe((resp) => {
      console.log(resp.data);
      this.resultados=resp.data
      localStorage.setItem('resultado',JSON.stringify(  this.resultados))
    })
    
  }
}
