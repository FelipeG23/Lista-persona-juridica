import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from 'src/app/models/PeriodicElement';
import { PasswordService } from 'src/app/service/changePassword/password.service';
import { EvaluacionProveedorComponent } from '../logeado/evaluacion-proveedor/evaluacion-proveedor.component';
import swal from 'sweetalert';



@Component({
  selector: 'app-datos-evaluacion',
  templateUrl: './datos-evaluacion.component.html',
  styleUrls: ['./datos-evaluacion.component.less']
})
export class DatosEvaluacionComponent implements OnInit {

  registrarAuto: FormGroup;
  detalleCita: any;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<EvaluacionProveedorComponent>,
              public dialog: MatDialog,
              public serviceTerceros: PasswordService,
              @Inject(MAT_DIALOG_DATA) public data: any
              ) { }

  ngOnInit(): void {

    this.setFormRegistra();
    this.detalleCita = this.data.datoCita;

    console.log(this.detalleCita);
    this.registrarAuto.controls['idTercero'].disable();
    this.registrarAuto.controls['nombre'].disable();
    this.registrarAuto.controls['tipoTerce'].disable();
    this.registrarAuto.controls['descripcion'].disable();
    this.registrarAuto.controls['evalCumplimiento1'].disable();
    this.registrarAuto.controls['evalCumplimiento2'].disable();
    this.registrarAuto.controls['evalCalidad1'].disable();
    this.registrarAuto.controls['evalCalidad2'].disable();
    this.registrarAuto.controls['evalAcompana1'].disable();
    this.registrarAuto.controls['evalAcompana2'].disable();
    this.registrarAuto.controls['evalAdmon1'].disable();
    this.registrarAuto.controls['evalAdmon2'].disable();
    this.registrarAuto.controls['evalAdmon3'].disable();
    this.registrarAuto.controls['evalAdmObserva'].disable();
    this.registrarAuto.controls['evalAdmRecomienda'].disable();
    this.registrarAuto.controls['evalFsfbNombre'].disable();
    this.registrarAuto.controls['evalFsfbCargo'].disable();
  }

  setFormRegistra() {
    this.registrarAuto = this.fb.group({
      idTercero: [''],
      nombre: [''],
      descripcion: [''],
      tipoTerce: [''],
      evalDescripcion: [''],
      evalCumplimiento1: ['',],
      evalCumplimiento2: [''],
      evalCalidad1: [''],
      evalCalidad2: [''],
      evalAcompana1: [''],
      evalAcompana2: [''],
      evalAdmon1: [''],
      evalAdmon2: [''],
      evalAdmon3: [''],
      evalAdmObserva: [''],
      evalAdmRecomienda: [''],
      evalFsfbNombre: [''],
      evalFsfbCargo: [''],
    });

  }

  close() {

    this.dialogRef.close();

  }

  onSubmit() {

    const caGestionAutorizacion: PeriodicElement = Object.assign(new PeriodicElement(), this.registrarAuto.value);


    caGestionAutorizacion.evalId = 0;
    caGestionAutorizacion.evalProvee = this.detalleCita.userproviderId;
    caGestionAutorizacion.evalNit = this.detalleCita.userProviderNit;


    if ( this.registrarAuto.valid ) {

      this.serviceTerceros.createEvaluation(caGestionAutorizacion).subscribe(
        (data: any) => {



        }, (error: HttpErrorResponse) => {
          // this.spinnerService.hide();
          console.log(error);

          if (error.status ===  200 || error.status ===  201 || error.status ===  202 ) {

            swal({
               title: 'Evaluación',
               text: 'Registro de evaluación creada correctamente.',
               icon: 'success',
             });

             this.dialogRef.close();


           } else {

             swal({
               title: 'Evaluación',
               text: 'Comuniquese con el administrador',
               icon: 'error',
             });
           }

        });

    } else {

      swal({
        title: 'Error',
        text: 'El formulario debe estar diligenciado correctamente',
        icon: 'error',
    });
    }
  }

}

