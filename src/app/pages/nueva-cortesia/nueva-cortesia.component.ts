import { Component, OnInit } from '@angular/core';
import { Participante } from 'src/app/interfaces/participante.interface';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-cortesia',
  templateUrl: './nueva-cortesia.component.html',
  styleUrls: ['./nueva-cortesia.component.css']
})
export class NuevaCortesiaComponent implements OnInit {
  participante = new Participante();
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  guardarCortesia() {
    Swal.fire({
      title: '¿Estás seguro de querer guardar?',
      text: 'Se enviará un correo a la persona que registraste',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.value) {
        this.participante.formaPago = '3';
        this.participante.estatusRegistro = '2';
        this.http.post('https://www.e-eventos.com/dymabogados/backend/insertar_cortesia.php', this.participante).subscribe((data: any) => {
      console.log(data);
      if (data.respuesta === 1) {

        Swal.fire({
          icon: 'success',
          title: 'Cortesía creada con éxito'

        });
      }
    });


      }
    });
  }
  

}
