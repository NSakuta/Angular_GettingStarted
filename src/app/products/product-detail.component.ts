import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { IProduct } from "./poduct";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit, OnDestroy {

    pageTitle: string = 'Product Detail';

    product: IProduct | undefined;

    products: IProduct[] = [];

    subscription!: Subscription;

    selectedProduct: IProduct | undefined;

    constructor(private route: ActivatedRoute,
                private router: Router,
                public productService: ProductService) {

    }


    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.pageTitle += `: ${id}`;

        this.subscription = this.productService.productData$.subscribe(
            data => { 
                this.products = data;    
                this.selectedProduct = this.products.find(el => el.productId == id);
                this.product = this.selectedProduct;
            
            if (this.product == null) {
                this.productService.getProducts().subscribe({
                    next: data => {
                        this.products = data;
                        this.selectedProduct = this.products.find(el => el.productId == id);
                        this.product = this.selectedProduct;
                        }
                    })
                }
            }
        )
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onBack(): void {
        this.router.navigate(['/products'])
    }
}