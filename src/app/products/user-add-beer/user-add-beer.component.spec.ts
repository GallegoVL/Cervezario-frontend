import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddBeerComponent } from './user-add-beer.component';

describe('UserAddBeerComponent', () => {
  let component: UserAddBeerComponent;
  let fixture: ComponentFixture<UserAddBeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAddBeerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAddBeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
