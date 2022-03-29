import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserDetailComponent } from './user-detail.component';
import { UsersComponent } from './users.component';

@NgModule({
    declarations: [
      UserDetailComponent,
      UsersComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {path: 'users', component: UsersComponent},
            {path: 'users/:id', component: UserDetailComponent},
          ]),
    ]
})

export class UsersModule {}