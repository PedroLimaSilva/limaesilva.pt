import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvFooterComponent } from './my-footer.component';

describe('CvFooterComponent', () => {
  let component: CvFooterComponent;
  let fixture: ComponentFixture<CvFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
