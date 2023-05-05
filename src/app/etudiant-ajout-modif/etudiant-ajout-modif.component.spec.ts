import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantAjoutModifComponent } from './etudiant-ajout-modif.component';

describe('EtudiantAjoutModifComponent', () => {
  let component: EtudiantAjoutModifComponent;
  let fixture: ComponentFixture<EtudiantAjoutModifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtudiantAjoutModifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudiantAjoutModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
