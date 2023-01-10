import { Component } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { environment } from './../../environments/environment';

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html'
})
export class AppFooterComponent {

    public versionNo = environment.versionNo;
    public versionType = environment.versionType;
    public year: number;

    constructor(public layoutService: LayoutService) {
        this.year = new Date().getFullYear();
    }
}
