import { DebugElement, inject } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ProductListComponent } from './product-list.components';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {ProductService} from './product.service';


describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let de: DebugElement;

  let productService: any;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [ProductService]
  }));


  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  beforeEach(async () => {
      productService = jasmine.createSpy('UserService');
      
  })

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  it('should toggle the "showImage" boolean', () => {
      expect(component.showImage).toBeFalsy();
      component.toggleImage();
      expect(component.showImage).toBeTruthy();
  })

  it(`should have as title 'Product List'`, () => {
    expect(component.pageTitle).toEqual('Product List');
  });

  

});
