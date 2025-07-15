import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPricipalComponent } from './menu-pricipal.component';

describe('MenuPricipalComponent', () => {
  let component: MenuPricipalComponent;
  let fixture: ComponentFixture<MenuPricipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPricipalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuPricipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
