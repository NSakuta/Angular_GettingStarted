import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { IUser } from "./service";
import { UsersService } from "./users.service";

@Component({
    selector: 'pm-users',
    templateUrl: './users.component.html',
    styleUrls: []
})


export class UsersComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Users';

    users: IUser[] = [];
    sub!: Subscription;

    constructor(private userService: UsersService) {}

    ngOnInit(): void {
        this.sub = this.userService.getAllUsers().subscribe({
                next: data => {
                    this.users = data;
                }
            })
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}