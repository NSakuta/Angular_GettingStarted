import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { IUser } from "./service";
import { UsersService } from "./users.service";

@Component({
    templateUrl: './user-detail.component.html',
    styleUrls: []
})


export class UserDetailComponent implements OnInit {
    pageTitle: string = "User's detail"
    users: IUser[] = [];

    selectedUser: IUser | undefined;

    sub!: Subscription;

    constructor(private userService: UsersService, 
                private route: ActivatedRoute,
                private router: Router) {}

    onBack(): void {
        this.router.navigate(['/users'])
    }

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        console.log('id: ', id)

        this.sub = this.userService.userSubject.subscribe(
            data => { 
                    this.users = data
                }           
        ) 
        this.selectedUser = this.users?.find(el => el.id === id);    
    }

}