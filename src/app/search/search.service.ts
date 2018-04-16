import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {
    public paginationPage: number;
    public searchValueText: string;
    public startAtDetails: boolean;
    public sortType = 'field_1';
    public sortOrder = 'asc';

    constructor() {}

    // Sets the text entered into search
    public searchValue(text: string) {
        this.searchValueText = text;
    }
}
