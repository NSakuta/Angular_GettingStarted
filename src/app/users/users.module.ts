import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserDetailComponent } from './user-detail.component';
import { UsersComponent } from './users.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
      UserDetailComponent,
      UsersComponent
    ],
    imports: [
        RouterModule.forChild([
            {path: 'users', component: UsersComponent},
            {path: 'users/:id', component: UserDetailComponent},
          ]),
        SharedModule
    ]
})

export class UsersModule {}