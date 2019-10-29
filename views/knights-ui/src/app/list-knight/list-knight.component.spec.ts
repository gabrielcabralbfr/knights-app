import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListKnightComponent } from './list-knight.component';

describe('ListKnightComponent', () => {
  let component: ListKnightComponent;
  let fixture: ComponentFixture<ListKnightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListKnightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListKnightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
