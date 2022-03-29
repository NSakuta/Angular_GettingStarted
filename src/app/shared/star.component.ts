import { Component, Input, Output, SimpleChanges } from "@angular/core";
import { OnChanges } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})



export class StarComponent implements OnChanges {
    @Input() rating: number = 0;
    cropWidth: number = 75;
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>()

    ngOnChanges(): void {
        this.cropWidth = this.rating * 75/5
    }

    onClick(): void {
        console.log(`The Rating is ${this.rating}`)
        this.ratingClicked.emit(` the rating is ${this.rating}`)
    }
}