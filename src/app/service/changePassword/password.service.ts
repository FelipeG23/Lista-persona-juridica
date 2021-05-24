import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  sendEmail = 'sendEmailUpdatePassword';
  allPaginateData = 'allPaginate'
  createEvaluationData = 'createEvaluation'
  //uid: "agarcia";

  constructor(private http: HttpClient) { }



  changePassword(params: any){


    params.userproviderNit = `${params.tipoDocumento}${params.userproviderNit}`;
    var datos = {
      userproviderNit: " "
    };
    datos.userproviderNit = params.userproviderNit;

    return this.http.post<any>( environment.url + this.sendEmail, datos);

  }

  allPaginate(params: any){
    return this.http.get<any>( `${environment.url}${this.allPaginateData}?nroPagina=${params.pageNumber}&mostrar=${params.mostrar}`);

  }

  createEvaluation(params: any) {

    return this.http.post<any>( environment.url + this.createEvaluationData, params);

  }

  datosDataPJ(data){

    return this.http.post(`http://52.247.56.140:8080/getDataPJ`, data);
  }

  datosDataPN(data){

    return this.http.post(`http://52.247.56.140:8080/getDataPN`, data);
  }


  getEvaluations(data){
    console.log(data);


    return this.http.get(`http://52.247.56.140:8080/getEvaluations?identificacion=${data}`);

  }



}
