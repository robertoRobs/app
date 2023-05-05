import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(private _http: HttpClient) { }

  ajoutEtudiant(data: any): Observable <any>{
    return this._http.post('http://localhost:3000/etudiants', data);
  }
  modifEtudiant(id: number,data: any): Observable <any>{
    return this._http.put('http://localhost:3000/etudiants/' + id, data);
  }

  listEtudiant(): Observable <any>{
    return this._http.get('http://localhost:3000/etudiants');
  }
  supprEtudiant(id: number): Observable<any>{
    return this._http.delete('http://localhost:3000/etudiants/' + id);
    // return this._http.delete(`http://localhost:3000/etudiants/${id}`);
  }

}
