import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EtudiantAjoutModifComponent } from './etudiant-ajout-modif/etudiant-ajout-modif.component';
import { EtudiantService } from './services/etudiant.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './Core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EtudiantApp';

  displayedColumns: string[] = ['id', 'matricule', 'prenom', 'nom', 'age', 'classe','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor(private _dialog: MatDialog, private _etService:EtudiantService, private _coreService: CoreService){}
 
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.listEtudiant();
  }

    ouvertureForm(){
     const dialogRef = this._dialog.open(EtudiantAjoutModifComponent);
     dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.listEtudiant();
      }
     }
    })
  }
  listEtudiant(){

    this._etService.listEtudiant().subscribe({
      next: (res) => {
        res.sort((a:any, b:any) => a.nom.localeCompare(b.nom));
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },

    // this._etService.listEtudiant().subscribe({
    //   next: (res) =>{
    //     // console.log(res);
    //     this.dataSource =new MatTableDataSource (res);
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;
        
    //   },
    //   error: (err) =>{
    //     console.log(err);
        
    //   }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  supprEtudiant(id: number) {
  this._etService.supprEtudiant(id).subscribe({
    next: (res) => {
      // alert("Etudiant supprimé");
      this._coreService.openSnackBar('Etudiant supprimé','Fait');
      this.listEtudiant(); 
    },
    error: (err) => {
      console.log(err);
      
    }
  })
}
modifForm(data: any){
  const dialogRef = this._dialog.open(EtudiantAjoutModifComponent, {
    data,
  });
  dialogRef.afterClosed().subscribe({
    next: (val) => {
      this._coreService.openSnackBar('Etudiant Modifié');
      if(val){
        this.listEtudiant();
    }
   }
  })
  
}






}