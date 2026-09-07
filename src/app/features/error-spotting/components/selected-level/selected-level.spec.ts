import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedLevel } from './selected-level';

describe('SelectedLevel', () => {
  let component: SelectedLevel;
  let fixture: ComponentFixture<SelectedLevel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedLevel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedLevel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
