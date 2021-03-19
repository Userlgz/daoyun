import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-daoyun-copyright',
    templateUrl: './copyright.component.html',
    styleUrls: ['./copyright.component.scss'],
})
export class CopyrightComponent implements OnInit {

    bottom: string;
    text: string;
    constructor() {
        const year = (new Date()).getFullYear();
        this.text = `2021-${year} 到云`;
        this.bottom = '10px';
    }

    ngOnInit() { }

}
