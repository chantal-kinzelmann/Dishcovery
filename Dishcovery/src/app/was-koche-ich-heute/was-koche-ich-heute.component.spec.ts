import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasKocheIchHeuteComponent } from './was-koche-ich-heute.component';

describe('WasKocheIchHeuteComponent', () => {
  let component: WasKocheIchHeuteComponent;
  let fixture: ComponentFixture<WasKocheIchHeuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WasKocheIchHeuteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WasKocheIchHeuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

