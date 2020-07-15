import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDoctoresComponent } from './listado-doctores.component';

describe('ListadoDoctoresComponent', () => {
  let component: ListadoDoctoresComponent;
  let fixture: ComponentFixture<ListadoDoctoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoDoctoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoDoctoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
