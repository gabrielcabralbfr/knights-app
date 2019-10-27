import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKnightComponent } from './create-knight.component';

describe('CreateKnightComponent', () => {
  let component: CreateKnightComponent;
  let fixture: ComponentFixture<CreateKnightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateKnightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateKnightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
