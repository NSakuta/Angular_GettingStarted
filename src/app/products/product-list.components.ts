import { Component, OnDestroy } from "@angular/core";
import { IProduct } from "./poduct";
import { OnInit } from "@angular/core";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product List';

    imageWidth: number = 50;

    imageMargin: number = 2;

    showImage: boolean = false;

    errorMessage = '';

    sub!: Subscription;

    products: IProduct[] = [];

    ////////////////////ListFilter

    private _listFilter: string = '';

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        console.log('value in setter: ', value)
        this.filteredProducts = this.performFilter(value)
    }
    //////////////////ModelFilter

    private _modelFilter: string = '';

    get modelFilter(): string {
        return this._modelFilter;
    }
    set modelFilter(value: string) {
        this._modelFilter = value;
        console.log('value by modelFilter: ', value);
        this.filteredProducts = this.performFilterByCode(value);
    }

    toggleImage(): void {
        this.showImage = !this.showImage
    }

    filteredProducts: IProduct[] = [];

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((prod: IProduct) => 
            prod.productName.toLocaleLowerCase().includes(filterBy));
    }
    performFilterByCode(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((prod: IProduct) => 
            prod.productCode.toLocaleLowerCase().includes(filterBy))
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List:' + message;
    }


    constructor(private productService: ProductService) {

    }

    ngOnInit(): void {
        this.listFilter = '';
        this.modelFilter = '';

        this.sub = this.productService.getProducts().subscribe({
            next: products => { 
                this.products = products
                this.filteredProducts = this.products
            },
            error: err => this.errorMessage = err
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}