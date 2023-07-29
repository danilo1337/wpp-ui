import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WppService {

  constructor() { }

  async uploadArquivo(file: File) {
    return axios.post(`${environment.URL_WPP_API}/contatos/arquivo/upload`, { file, }, { headers: { 'Content-Type': `multipart/form-data`, }, });
  }
}
