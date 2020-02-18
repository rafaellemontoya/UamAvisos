import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Participante } from '../../interfaces/participante.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-registro',
  templateUrl: './ver-registro.component.html',
  styleUrls: ['./ver-registro.component.css']
})
export class VerRegistroComponent implements OnInit {

  items: any[];
  usersJson: any[];
  terminoBusquedaNombre: string;
  terminoBusquedaApellido: string;
  terminoBusquedaId: string;
  terminoBusquedaPedido: string;
  terminoBusquedaEmpresa: string;
  terminoFormaPago: string;
  terminoBusquedaEstatusPago: string;
  imprimiendo = false;
  user: User;

  preguntaEliminar = false;
  estadoEliminado = false;
  idEliminar = '';
  nombreEliminar = '';

  estadoImprimiendo = false;


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    // this.isLoggedIn();
    this.getInfo();
    }

  getInfo() {
    this.http.get('https://www.e-eventos.com/dymabogados/backend/obtener_todos_participantes.php').subscribe((data: any) => {
      console.log(data);
      // tslint:disable-next-line:no-string-literal
      // this.items = data;
      this.usersJson = Array.of(data);
      console.log (this.usersJson);
    });
  }

  isLoggedIn() {
    const requestcode = 'bs19';
    this.http.post('https://www.e-eventos.com/dymabogados/backend/isLoggedIn.php', requestcode ).subscribe((data: any) => {
      console.log(data);
      if (data.response === '1') {
        // this.obtenerAsistencia();
        this.getInfo();
      } else {
        this.router.navigate(['login']);
      }
    } );
  }

  preguntarEliminar(id, nombre) {

    window.scroll(0, 0);
    this.preguntaEliminar = true;
    this.idEliminar = id;
    console.log(this.idEliminar);
    this.nombreEliminar = nombre;

  }
  eliminar() {
    this.preguntaEliminar = false;
    const asistente = new Participante();
    // asistente.id = this.idEliminar.valueOf;
    this.http.post('', asistente).subscribe((data) => {
      console.log(data);
      if (data['respuesta'] === 1) {
        this.getInfo();
        this.estadoEliminado = true;

        window.scroll(0, 0);

      }
      // tslint:disable-next-line:no-string-literal
      // this.items = data;
      this.usersJson = Array.of(data);
      console.log (this.usersJson);
    });

  }

  rechazar(id) {
    const participante = new Participante();
    participante.id = id;
    console.log(participante);

    Swal.fire({
      title: 'Estás seguro de querer rechazarlo?',
      text: 'Se enviará la notificación al correo asignado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.http.post('https://www.e-eventos.com/cbm/enp20/backend/rechazar_participante.php', participante)
          .subscribe((data: any) => {
            if (data.respuesta === 1) {
              console.log(data);
              this.getInfo();
              Swal.fire(

                'Acción realizada correctamente!',
                'El participante ha sido rechazado.',
                'success'
              );
            }
          });

      }
    });

  }

  aceptar(id) {
    const participante = new Participante();
    participante.id = id;
    console.log(participante);
    Swal.fire({
      title: 'Estás seguro de querer aceptarlo?',
      text: 'Se enviará la notificación al correo asignado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.http.post('https://www.e-eventos.com/dymabogados/backend/aceptar_participante.php', participante)
          .subscribe((data: any) => {
            console.log(data);
            if (data.respuesta === 1) {
              Swal.fire(

                'Acción realizada correctamente!',
                'El estatus ha sido cambiado a pagado.',
                'success'
              );
              this.getInfo();
            }
          });

      }
    });

  }
  aceptarFactura(id) {
    const participante = new Participante();
    participante.id = id;
    console.log(participante);
    Swal.fire({
      title: 'Estás seguro marcar como generada la factura?',
      
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.http.post('https://www.e-eventos.com/dymabogados/backend/factura_generada.php', participante)
          .subscribe((data: any) => {
            console.log(data);
            if (data.respuesta === 1) {
              Swal.fire(

                'Acción realizada correctamente!',
                'El estatus ha cambiado a Generada.',
                'success'
              );
              this.getInfo();
            }
          });

      }
    });

  }
  getTextoEstadoPago(id): string {
    switch (id) {
      case '-1':
        return 'Rechazado';
        break;
        case '0':
          return 'Pendiente de pago';
          break;
        case '1':
          return 'Pagado';
          break;
          case '2':
            return 'Aceptado (Cortesia)';
            break;
            case '3':
              return 'Pendiente de pago';
              break;
    }
  }
  getClaseEstadoPago(id): string{
    switch (id) {
      case '-1':
        return 'text-warning';
        break;
        case '0':
          return 'text-danger';
          break;
        case '1':
          return 'text-success';
          break;
          case '2':
            return 'text-success';
            case '3':
              return 'text-warning';

    }
  }
  getTextoEstadoFactura(id): string {
    switch (id) {
      case '-1':
        return 'Rechazado';
        break;
        case '0':
          return 'Sin generar';
          break;
        case '1':
          return 'Generada';
          break;
          case '2':
            return 'Aceptado (Cortesia)';
            break;
            case '3':
              return 'Pendiente de pago';
              break;
    }
  }
  getClaseEstadoFactura(id): string{
    switch (id) {
      case '-1':
        return 'text-warning';
        break;
        case '0':
          return 'text-warning';
          break;
        case '1':
          return 'text-success';
          break;
          case '2':
            return 'text-success';
            case '3':
              return 'text-warning';

    }
  }
  cortesia(id) {
    const participante = new Participante();
    participante.id = id;
    console.log(participante);
    Swal.fire({
      title: 'Estás seguro de asignar Cortesía?',
      text: 'Se enviará la notificación al correo asignado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this.http.post('https://www.e-eventos.com/cbm/enp20/backend/cortesia_participante.php', participante)
          .subscribe((data: any) => {
            this.getInfo();
            console.log(data);
            if (data.respuesta === 1) {
              Swal.fire(

                'Acción realizada correctamente!',
                'El participante ha sido aceptado.',
                'success'
              );

            }
          });

      }
    });
  }
  pendientePago(id) {
    const participante = new Participante();
    participante.id = id;
    console.log(participante);
    Swal.fire({
      title: 'Estás seguro de cambiar el estado a Pendiente de pago?',
      text: 'Se enviará la notificación al correo asignado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.http.post('https://www.e-eventos.com/cbm/enp20/backend/pendiente_pago_participante.php', participante)
          .subscribe((data: any) => {
            console.log(data);
            if (data.respuesta === 1) {
              Swal.fire(

                'Acción realizada correctamente!',
                'El participante ha sido aceptado.',
                'success'
              );
              this.getInfo();
            }
          });

      }
    });
  }
  logout() {
    const dataenviada = '';
    this.http.post('https://www.e-eventos.com/cbm/enp20/backend/logout.php', dataenviada).subscribe((data: any) => {
      if (data.respuesta === 1) {
        this.router.navigate(['login']);
      }
    });
  }
  getFormaPago(formaPago){
    if(formaPago==='1'){
      return 'Paypal';
    }else if(formaPago ==='2'){
      return 'Transferencia';
    }
  }

}
