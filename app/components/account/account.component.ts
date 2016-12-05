import { Component } from '@angular/core';
import { User } from '../../models/user';

@Component({
    template: `
        <h1>Welcome {{user.email}}</h1>
        <p>Your Api key is {{ user.apikey }}</p>
    `
})

export class AccountComponent {
    private user: User = {
        email: "",
        password: "",
        apikey: ""
    };
}