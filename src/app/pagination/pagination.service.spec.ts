import { TestBed, inject } from '@angular/core/testing';

import { PaginationService } from './pagination.service';

describe('PaginationService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PaginationService]
        });
    });

    it('should be created', inject([PaginationService], (service: PaginationService) => {
        expect(service).toBeTruthy();
    }));


    it('should show 10 pages',
        inject([PaginationService], (service: PaginationService) => {
            const results = service.getPager(120, 1, 10);

            expect(results.pages.length).toBe(10);
        }));

    it('should show 10 pages',
        inject([PaginationService], (service: PaginationService) => {
            const results = service.getPager(120, 9, 10);

            expect(results.pages.length).toBe(10);
        }));

    it('should show 10 pages',
        inject([PaginationService], (service: PaginationService) => {
            const results = service.getPager(120, 7, 10);

            expect(results.pages.length).toBe(10);
        }));
});
