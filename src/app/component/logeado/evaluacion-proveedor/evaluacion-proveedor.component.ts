import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from '../../../models/PeriodicElement';
import swal from 'sweetalert';
import { PasswordService } from 'src/app/service/changePassword/password.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-evaluacion-proveedor',
  templateUrl: './evaluacion-proveedor.component.html',
  styleUrls: ['./evaluacion-proveedor.component.less']
})
export class EvaluacionProveedorComponent implements OnInit {

  registrarAuto: FormGroup;
  detalleCita: any;
  userProviderFecha = new Date();


  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<EvaluacionProveedorComponent>,
              public dialog: MatDialog,
              public serviceTerceros: PasswordService,
              @Inject(MAT_DIALOG_DATA) public data: any
              ) { }

  ngOnInit(): void {

    this.setFormRegistra();
    this.detalleCita = this.data.datoCita;



  }

  setFormRegistra() {
    this.registrarAuto = this.fb.group({
      evalDescripcion: ['', [ Validators.required, Validators.minLength(7) ]],
      evalCumplimiento1: ['', [ Validators.required, Validators.minLength(0), Validators.maxLength(1) ]],
      evalCumplimiento2: ['', [ Validators.required, Validators.minLength(0), Validators.maxLength(1) ]],
      evalCalidad1: ['', [ Validators.required, Validators.minLength(0), Validators.maxLength(1) ]],
      evalCalidad2: ['', [ Validators.required, Validators.minLength(0), Validators.maxLength(1) ]],
      evalAcompana1: ['', [ Validators.required, Validators.minLength(0), Validators.maxLength(1) ]],
      evalAcompana2: ['', [ Validators.required, Validators.minLength(0), Validators.maxLength(1) ]],
      evalAdmon1: ['', [ Validators.required, Validators.minLength(0), Validators.maxLength(1) ]],
      evalAdmon2: ['', [ Validators.required, Validators.minLength(0), Validators.maxLength(1) ]],
      evalAdmon3: ['', [ Validators.required, Validators.minLength(0), Validators.maxLength(1) ]],
      evalAdmObserva: ['', [ Validators.required, Validators.minLength(7), Validators.maxLength(600) ]],
      evalAdmRecomienda: ['', [ Validators.required ]],
      evalFsfbNombre: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)]],
      evalFsfbCargo: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)]],
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
    caGestionAutorizacion.userProviderFecha = new Date();

    console.log(caGestionAutorizacion);

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
