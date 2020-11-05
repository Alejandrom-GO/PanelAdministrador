import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../services/conexion.service';
import * as $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css']
})
export class ViewsComponent implements OnInit {
  public mesas: any = [];
  public mesasDisponible: any = [];
  public mesaReservada: any = [];
  public mesaAbierta: any = [];
  public mesaUsuario: any = [];
items: any;
itemEditar: any = {firstname: '' };
  constructor(private con: ConexionService) {
  this.con.retornaItems().subscribe(items => {
    this.items = items;
    // console.log(this.items);
  });
  this.con.retornarMesas().subscribe((res: any) => {
    this.mesas = res;
    // console.log(this.mesas);
    for (const mesa of this.mesas) {
      if (mesa.estado === 'disponible') {
        this.mesasDisponible.push(mesa);
      }
    }
    // console.log(this.mesasDisponible);
  });
   }
  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  eliminar(id){
  this.con.eliminar(id);
  // console.log(id);
  }

  // tslint:disable-next-line:typedef
  editar(item){
     this.itemEditar = item;
     this.mesaUsuario = this.itemEditar.mesa;
  }
  // tslint:disable-next-line:typedef
  editarform(){
    this.mesaReservada = {id: this.itemEditar.mesa, numeroMesa: this.itemEditar.mesa, estado: 'Reservado'};
    if (this.mesaAbierta !== this.itemEditar.mesa){
      this.mesaAbierta = {id: this.mesaUsuario, numeroMesa: this.mesaUsuario, estado: 'disponible'};
      this.con.editarmesa(this.mesaAbierta);
    }
    this.con.editarmesa(this.mesaReservada);
    this.con.editar(this.itemEditar);
    Swal.fire({
      icon: 'success',
      title: 'Modificacion Exitosa',
      confirmButtonText: 'OK'
    }).then(() => {
      window.location.href = '/';
    });
  }
  // tslint:disable-next-line:typedef
  cerrar(){
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }
}
