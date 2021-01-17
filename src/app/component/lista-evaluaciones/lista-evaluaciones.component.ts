import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PasswordService } from 'src/app/service/changePassword/password.service';
import { EvaluacionProveedorComponent } from '../logeado/evaluacion-proveedor/evaluacion-proveedor.component';
import swal from 'sweetalert';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosEvaluacionComponent } from '../datos-evaluacion/datos-evaluacion.component';

@Component({
  selector: 'app-lista-evaluaciones',
  templateUrl: './lista-evaluaciones.component.html',
  styleUrls: ['./lista-evaluaciones.component.less']
})
export class ListaEvaluacionesComponent implements OnInit {

  displayedColumns: string[] = ['evalNit', 'nombre', 'tipoTercero', 'fecha', 'evaluationData'];
  dataTerceros: any;
  dataSource: MatTableDataSource<any>;
  pageSizeOptions: number[] = [5, 10, 20];
  length = 800;
  pageSize = 5;
  identificacion: any;
  dataTerceroPN: any;
  dataTerceroPJ: any;
  detalleEvaluacion: any;



  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
              public serviceTerceros: PasswordService,
              private changeDetectorRefs: ChangeDetectorRef,
              public dialogRef: MatDialogRef<ListaEvaluacionesComponent>,
              private _route: ActivatedRoute,
              private router: Router
              ) {}


    ngOnInit() {


    this.identificacion =  this._route.snapshot.paramMap.get('id');


    this.serviceTerceros.datosDataPJ(this.identificacion).subscribe(
      (data: any) => {
       // this.spinnerService.hide();
          this.dataTerceroPJ = data;
           console.log(data);


      }, err => {
        // this.spinnerService.hide();
        this.dataTerceroPJ = null;

      });

      this.serviceTerceros.datosDataPN(this.identificacion).subscribe(
        (data: any) => {
         // this.spinnerService.hide();
            this.dataTerceroPN = data;
            console.log(data);

        }, err => {
          // this.spinnerService.hide();
          this.dataTerceroPN = null;

        });

    this.serviceTerceros.getEvaluations(this.identificacion ).subscribe(
      (data: any) => {
       // this.spinnerService.hide();
          console.log(data);
          this.dataTerceros = data;
          this.dataSource = new MatTableDataSource<any>(this.dataTerceros);
          this.dataSource.paginator = this.paginator;

        if (this.dataTerceroPJ === null) {

          for (let index = 0; index < this.dataTerceros.length; index++) {
            const element = this.dataTerceros[index];

            element.nombre = this.dataTerceroPN.datosPNApellidosNombres;
            element.tipoPersona = this.dataTerceroPN.datosPNId;
          }


        } else {

          for (let index = 0; index < this.dataTerceros.length; index++) {
            const element = this.dataTerceros[index];

           element.nombre = this.dataTerceroPN.datosPNApellidosNombres;

          }

        }

      }, err => {
        // this.spinnerService.hide();
        swal({
          title: 'Error',
          text: 'Error registrando la autorización, por favor intente nuevamente',
          icon: 'warning',
        });
      });



      console.log("Test", this.dataTerceros );



  }

  openDialogAutorizacion(datoCita){


    const dialogRef = this.dialog.open(EvaluacionProveedorComponent, {
      data: { datoCita },
      height: '500px',
      disableClose: true
    });

  }

  openDialogListaEvaluaciones(datoCita){


    // datoCita.nombre = this.dataTerceroPN.datosPNApellidosNombres;


    const dialogRef = this.dialog.open(DatosEvaluacionComponent, {
      data: { datoCita },
      height: '800px',
      width: '1200px',
      disableClose: true
    });
  }

  close() {

    this.router.navigate(['']);


  }

  setPageSizeOptions(setPageSizeOptionsInput: any) {

    console.log("test1", setPageSizeOptionsInput.pageIndex);

    this.dataTerceros = null;
    this.serviceTerceros.allPaginate((setPageSizeOptionsInput.pageIndex))
            .subscribe((data: any) => {
            this.dataTerceros = data.listaUsuarios;
            this.dataSource = new MatTableDataSource<any>(this.dataTerceros);
          }, (error: HttpErrorResponse) => {
            setPageSizeOptionsInput.pageIndex -1;

            if (setPageSizeOptionsInput.pageIndex === 0) {

              this.serviceTerceros.allPaginate((setPageSizeOptionsInput.pageIndex + 1 ))
              .subscribe((data: any) => {
              this.dataTerceros = data.listaUsuarios;
              this.dataSource = new MatTableDataSource<any>(this.dataTerceros);
            })

            } else {

              this.serviceTerceros.allPaginate((setPageSizeOptionsInput.pageIndex -1 ))
              .subscribe((data: any) => {
              this.dataTerceros = data.listaUsuarios;
              this.dataSource = new MatTableDataSource<any>(this.dataTerceros);
            })

            }
         });

  }




}

/*
export interface PeriodicElement {
  userProviderNit: string;
  userProviderName: string;
  UserProviderLastname: string;
} */

export interface PeriodicElement {
  position: number;
  name: string;
  weight: string;
}


const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 'Jurídica', symbol: 'diego.guiza@siscomputo.com'},
  {position: 2, name: 'Helium', weight: 'Jurídica', symbol: 'hugo.alarcon@siscomputo.com'},
  {position: 3, name: 'Lithium', weight: 'Natural', symbol: 'adn.alarcon@gmail.com'},
  {position: 4, name: 'Beryllium', weight: 'Jurídica', symbol: 'danigarcia_1@hotmail.com'},
  {position: 5, name: 'Boron', weight: 'Natural', symbol: 'prueba1@corre.com'},
  {position: 6, name: 'Carbon', weight: 'Jurídica', symbol: 'diego.guiza@siscomputo.com'},
  {position: 7, name: 'Nitrogen', weight: 'Jurídica', symbol: 'hugo.alarcon@siscomputo.com'},
  {position: 8, name: 'Oxygen', weight: 'Natural', symbol: 'adn.alarcon@gmail.com'},
  {position: 9, name: 'Fluorine', weight: 'Jurídica', symbol: 'danigarcia_1@hotmail.com'},
  {position: 10, name: 'Neon', weight: 'Natural', symbol: 'prueba1@corre.com'},
  {position: 11, name: 'Sodium', weight: 'Jurídica', symbol: 'diego.guiza@siscomputo.com'},
  {position: 12, name: 'Magnesium', weight: 'Natural', symbol: 'hugo.alarcon@siscomputo.com'},
  {position: 13, name: 'Aluminum', weight: 'Jurídica', symbol: 'adn.alarcon@gmail.com'},
  {position: 14, name: 'Silicon', weight: 'Natural', symbol: 'danigarcia_1@hotmail.com'},
  {position: 15, name: 'Phosphorus', weight: 'Jurídica', symbol: 'prueba1@corre.com'},
  {position: 16, name: 'Sulfur', weight: 'Natural', symbol: 'diego.guiza@siscomputo.com'},
  {position: 17, name: 'Chlorine', weight: 'Jurídica', symbol: 'hugo.alarcon@siscomputo.com'},
  {position: 18, name: 'Argon', weight: 'Jurídica', symbol: 'adn.alarcon@gmail.com'},
  {position: 19, name: 'Potassium', weight: 'Jurídica', symbol: 'danigarcia_1@hotmail.com'},
  {position: 20, name: 'Calcium', weight: 'Natural', symbol: 'prueba1@corre.com'},
];
