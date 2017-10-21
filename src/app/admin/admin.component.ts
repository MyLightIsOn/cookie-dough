import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
    ngOnInit() {
        console.log('Admin OnInit');
    }
}
console.log('Loading Admin Component');
