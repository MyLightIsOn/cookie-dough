import { TestBed, inject } from '@angular/core/testing';

import { SearchService } from './search.service';

describe('SearchService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SearchService]
        });
    });

    it('should be created', inject([SearchService], (service: SearchService) => {
        expect(service).toBeTruthy();
    }));

    it('should set text string', inject([SearchService], (service: SearchService) => {

        service.searchValueText = 'test';
        service.searchValue('new text');

        expect(service.searchValueText).toBe('new text');
    }));
});
