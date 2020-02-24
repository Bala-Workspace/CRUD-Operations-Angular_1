import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public dbUrl = "http://localhost:3000/product";
  

  constructor( private http: HttpClient) {
    
  }

  public postProd(obj) {
    return this.http.post(this.dbUrl, obj, httpOptions);
  }

  public getProds() {
    return this.http.get(this.dbUrl);
  }

  public editProd(item) {
    return this.http.put(`${this.dbUrl}/${item.id}`, item , httpOptions);
  }

  public deleteProd(item) {
    return this.http.delete(`${this.dbUrl}/${item.id}`);
  }
}
