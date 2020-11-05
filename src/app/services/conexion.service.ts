import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'firebase/firestore';

export interface Item {firstname: string; }
export interface Mesas {name: string; }
@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  private itemsCollection: AngularFirestoreCollection<Item>;
  private itemDoc: AngularFirestoreDocument<Item>;
  private MesaDoc: AngularFirestoreDocument<Mesas>;
  items: Observable<Item[]>;
  private MesasCollection: AngularFirestoreCollection<Mesas>;
  mesas: Observable<Mesas[]>;
  constructor(private readonly afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('items');
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    this.MesasCollection = afs.collection<Mesas>('mesas');
    this.mesas = this.MesasCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Mesas;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  // tslint:disable-next-line:typedef
  retornaItems(){
    return this.items;
  }
  // tslint:disable-next-line:typedef
  retornarMesas(){
    return this.mesas;
    // return this.afs.collection('mesas').snapshotChanges;
    // return this.afs.collection('mesas').doc('5nBEvdb8t7pU2MCY5Ntb').snapshotChanges;
  }
  // tslint:disable-next-line:typedef
  eliminar(id: any){
    this.itemDoc = this.afs.doc<Item>('items/' + id);
    this.itemDoc.delete();
  }
  // tslint:disable-next-line:typedef
  editar(item){
     this.itemDoc = this.afs.doc<Item>('items/' + item.id);
     this.itemDoc.update(item);
  }

  // tslint:disable-next-line:typedef
  editarmesa(item){
    this.MesaDoc = this.afs.doc<Mesas>('mesas/' + item.id);
    this.MesaDoc.update(item);
  }
}
