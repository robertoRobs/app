import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EtudiantService } from '../services/etudiant.service';
// import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';
import { CoreService } from '../Core/core.service';

@Component({
  selector: 'app-etudiant-ajout-modif',
  templateUrl: './etudiant-ajout-modif.component.html',
  styleUrls: ['./etudiant-ajout-modif.component.scss']
})
export class EtudiantAjoutModifComponent {
  etForm: FormGroup;
  classe: string[]=[
    'L1 GL',
    'L2 GL',
    'L3 GL',
    'L1 RI',
  ]
  constructor(private _fb: FormBuilder, 
    private _etService: EtudiantService, 
    private _dialogRef: MatDialogRef <EtudiantAjoutModifComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
    
    ){
    this.etForm = this._fb.group({
      matricule:'', 
      prenom:'',
      nom:'',
      age:'',
      classe:'',
  })
  this.etForm.get('matricule')?.disable();
}
generateMatricule() {
  const nom = this.etForm.get('nom')?.value;
  const prenom = this.etForm.get('prenom')?.value;
  if (nom && prenom) {
    const date = new Date();
    // const dateString = date.toISOString().replace(/[-:.TZ]/g, '');
    const dateString = date
    .toLocaleString('fr-FR', { hour12: false })
    .replace(/[^\d]/g, '');
    const matricule = `${prenom[0]}${nom}-${dateString}-@`;
    this.etForm.patchValue({ matricule });
  }
}
envoieForm(){
  if(this.etForm.valid){
    // console.log(this.etForm.value);  
    if(this.etForm.controls['nom'].value === '' && this.etForm.controls['prenom'].value === ''&& this.etForm.controls['matricule'].value === ''&& this.etForm.controls['age'].value === ''&& this.etForm.controls['classe'].value === ''){
      // alert('les champs ne doivent pas etre vide');
      this._coreService.openSnackBar('les champs ne doivent pas etre vide');
      // this.listEtudiant(); 
    }else{
      const formData = this.etForm.getRawValue();
    if(this.data){
      this._etService.modifEtudiant(this.data.id,formData).subscribe({
        next: (val:any) => {
            // alert("Etudiant Modifié avec Succes");
            this._dialogRef.close(true);
        },
        error: (err:any) =>{
          console.error(err);
          
        } 
      })

    }else{

      this._etService.ajoutEtudiant(formData).subscribe({
        next: (val:any) => {
            // alert("Etudiant Ajouté avec Succes");
            this._coreService.openSnackBar('Etudiant Ajouté');
            this._dialogRef.close(true);
        },
        error: (err:any) =>{
          console.error(err);
          
        } 
      })
    }
    }
    
}
}

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.etForm.patchValue(this.data);  
}


}
