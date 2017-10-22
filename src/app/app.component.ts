import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    wasClicked = false;

    /*Toggles the wasClicked property that adds a class to the elements with this property*/
    menuToggle() {
        this.wasClicked = !this.wasClicked;
    }
}
