import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contato } from '../../models/contato.model';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  getContatos() {
    return this.http.get(`${this.apiUrl}/consultar`, {
      observe: 'response'
    })
  }

  private apiUrl = 'http://localhost:8080/api/contatos';

  constructor(private http: HttpClient) { }

  verificarDuplicidadeCelular(celular: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/duplicidade/${celular}`);
  }

  cadastrarContato(contato: Contato): Observable<any> {
    return this.http.post<any>(this.apiUrl, contato);
  }
  
}
