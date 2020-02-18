import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Participante } from 'src/app/interfaces/participante.interface';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-registro',
  templateUrl: './editar-registro.component.html',
  styleUrls: ['./editar-registro.component.css']
})
export class EditarRegistroComponent implements OnInit {

  constructor( private route: ActivatedRoute, private http: HttpClient, private location: Location, private router: Router ) { }

  idRecibido = 0;
  participante = new Participante();
  guardado = false;
  correoEnviado = false;

  ngOnInit() {
    this.route.params
    .subscribe( parametros => {
    this.idRecibido = parametros.id;
    console.log(parametros.id);
    this.obtenerInformacion(this.idRecibido);
    // this.obtenerInformacion(parametros['id']);

});
  }

  guardarParticipante() {


    this.http.post('https://www.e-eventos.com/cbm/enp20/backend/editar_participane_admin.php', this.participante)
    .subscribe((data: any) => {
      console.log(data);
      if (data.respuesta === 1) {
        if (data.respuesta === 1) {
          this.participante = new Participante();
          Swal.fire({
            title: 'Registro editado con éxito' ,
            html: 'Se han guardado los cambios.',
  
    icon: 'success',
  
    focusConfirm: false,
    confirmButtonText:
      'Aceptar'
            }).then((result) => {
              if (result.value) {
                this.router.navigate(['ver-registro']);

              }
            });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrió un error al realizar el registro',
            text: 'Por favor evita usar caracteres especiales e inténtalo nuevamente',

          });
        }

      }
    });

  }



  atras() {
    this.location.back();
  }
  obtenerInformacion(id: number) {
    this.participante.id = id;
    this.http.post('https://www.e-eventos.com/dymabogados/backend/obtener_participante_post.php', this.participante)
    .subscribe((data: any) => {
      console.log (data);
      this.participante.nombre = data.nombre;
      this.participante.apellido = data.apellido;
      this.participante.email = data.email;
      this.participante.puesto = data.puesto;
      this.participante.empresa = data.empresa;
      this.participante.estado = data.estado;
      this.participante.telefono = data.telefono;
      this.participante.nombreInscribe = data.nombreInscribe;
      this.participante.apellidoInscribe = data.apellidoInscribe;
      this.participante.telefonoInscribe = data.telefonoInscribe;
      this.participante.correoInscribe = data.correoInscribe;
      this.participante.monto = data.monto;
      this.participante.codigoDescuento = data.codigoDescuento;
      this.participante.formaPago = data.formaPago;
      this.participante.confirmacionPaypal = data.confirmacionPaypal;
      this.participante.referencia = data.referencia;
      this.participante.rfc = data.rfc;
      this.participante.calle = data.calle;
      this.participante.numeroExterior = data.numeroExterior;
      this.participante.numeroInterior = data.numeroInterior;
      this.participante.municipio = data.municipio;
      this.participante.colonia = data.colonia;
      this.participante.cp = data.cp;
      this.participante.correoFactura = data.correoFactura;
      this.participante.usoCFDI = data.usoCFDI;
      this.participante.formaPagoFiscal = data.formaPagoFiscal;
      this.participante.fechaRegistro = data.fechaRegistro;
      this.participante.estatusRegistro = data.estatusRegistro;
      this.participante.idGrupo = data.idGrupo;
      this.participante.idInscribe = data.idInscribe;
      this.participante.total = data.total;




    });
  }




}
