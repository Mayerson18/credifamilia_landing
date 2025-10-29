import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EncryptionService } from './encryption.service';

export interface PrevalidadorSoapRequestDto {
  idOportunidad: string | null;
  nombre: string;
  apellidos: string;
  numDocumento: string;
  tipoDocumento: string;
  idTipoDocumento: string;
  edad: string;
  correo: string;
}

export interface RequestDto {
  data: string;
}

export interface ResponseDto {
  code: number;
  mensaje: string;
  data?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PrevalidadorSoapService {
  private readonly baseUrl = 'https://pruebas.credifamilia.com.mx/consumo-acabados/api/prevalidador';

  constructor(
    private http: HttpClient,
    private encryptionService: EncryptionService
  ) {}

  consultarPrevalidador(requestData: PrevalidadorSoapRequestDto): Observable<ResponseDto> {
    const encryptedData = this.encryptionService.encrypt(requestData);
    const request: RequestDto = { data: encryptedData };
    
    return this.http.post<ResponseDto>(`${this.baseUrl}/consultar`, request);
  }
}
