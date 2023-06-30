import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbucketComponent } from './newbucket.component';

describe('NewbucketComponent', () => {
  let component: NewbucketComponent;
  let fixture: ComponentFixture<NewbucketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewbucketComponent]
    });
    fixture = TestBed.createComponent(NewbucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
