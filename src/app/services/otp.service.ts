import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EncryptionService } from './encryption.service';

export interface OtpRequestDto {
  telefono: string;
  otp?: string;
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
export class OtpService {
  private readonly baseUrl = 'https://pruebas.credifamilia.com.mx/consumo-acabados/api/otp';

  constructor(
    private http: HttpClient,
    private encryptionService: EncryptionService
  ) {}

  generarOtp(telefono: string): Observable<ResponseDto> {
    const requestData: OtpRequestDto = { telefono };
    const encryptedData = this.encryptionService.encrypt(requestData);
    const request: RequestDto = { data: encryptedData };
    
    return this.http.post<ResponseDto>(`${this.baseUrl}/generar`, request);
  }

  validarOtp(telefono: string, otp: string): Observable<ResponseDto> {
    const requestData: OtpRequestDto = { telefono, otp };
    const encryptedData = this.encryptionService.encrypt(requestData);
    const request: RequestDto = { data: encryptedData };
    
    return this.http.post<ResponseDto>(`${this.baseUrl}/validar`, request);
  }
}
