import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../services/conexion.service';


@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css']
})
export class ViewsComponent implements OnInit {
items: any;
itemEditar: any = {firstname: '' };
  constructor(private con: ConexionService) {
  this.con.retornaItems().subscribe(items => {
    this.items = items;
    // console.log(this.items);
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
     console.log(item);
     this.itemEditar = item;
  }
  // tslint:disable-next-line:typedef
  editarform(){
    this.con.editar(this.itemEditar);
  }
  // tslint:disable-next-line:typedef
  cerrar(){
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }
}
