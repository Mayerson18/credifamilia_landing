import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EncryptionService } from './encryption.service';

export interface ClienteAcabadosDto {
  tipoDocumento: string;
  numeroDocumento: string;
  nombres: string;
  primerApellido: string;
  fechaNacimiento: string;
  celular: string;
  correoElectronico: string;
  ciudadVivienda: string;
}

export interface UpdateClienteAcabadosDto {
  idOportunidad: string;
  idLead: string;
  detalle: string;
}

export interface ClienteResponseDto {
  codigo: string;
  idLead: string;
  idOportunidad: string;
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
export class ClienteAcabadosService {
  private readonly baseUrl = 'https://pruebas.credifamilia.com.mx/consumo-acabados/api/acabados';

  constructor(
    private http: HttpClient,
    private encryptionService: EncryptionService
  ) {}

  crearCliente(cliente: ClienteAcabadosDto): Observable<ResponseDto> {
    const encryptedData = this.encryptionService.encrypt(cliente);
    const request: RequestDto = { data: encryptedData };
    
    return this.http.post<ResponseDto>(`${this.baseUrl}/crearCliente`, request);
  }

  updateClienteAcabados(updateData: UpdateClienteAcabadosDto): Observable<ResponseDto> {
    const encryptedData = this.encryptionService.encrypt(updateData);
    const request: RequestDto = { data: encryptedData };
    
    return this.http.post<ResponseDto>(`${this.baseUrl}/updateClienteAcabados`, request);
  }

  ultimoResultadoPrevalidador(identificacion: string, idOportunidad: string | null, fechaEnvioSolicitud: string): Observable<ResponseDto> {
    const requestData = {
      identificacion,
      idOportunidad,
      fechaEnvioSolicitud
    };
    
    const encryptedData = this.encryptionService.encrypt(requestData);
    const request: RequestDto = { data: encryptedData };
    
    return this.http.post<ResponseDto>(`${this.baseUrl}/ultimoResultadoPrevalidador`, request);
  }
}
