import { FilterCompaniesPipe } from './filter-companies.pipe';

describe('FilterCompaniesPipe', () => {
    it('create an instance', () => {
        const pipe = new FilterCompaniesPipe();
        expect(pipe).toBeTruthy();
    });

    it('return filtered items', () => {
        const pipe = new FilterCompaniesPipe();
        const mockCompany = [
            { id: '0', field_3: 'company 1', field_2_raw: {}, field_29: true, field_32_raw: 0.1},
            { id: '1', field_3: 'company 2', field_2_raw: {}, field_29: true, field_32_raw: 0.4},
            { id: '2', field_3: 'company 3', field_2_raw: {}, field_29: true, field_32_raw: 0.5},
            { id: '3', field_3: 'company 4', field_2_raw: {}, field_29: true, field_32_raw: 0.7},
            { id: '4', field_3: 'company 5', field_2_raw: null, field_29: true, field_32_raw: 1},
            { id: '5', field_3: 'company 6', field_2_raw: {}, field_29: true, field_32_raw: undefined}
        ];

        const result = pipe.transform(mockCompany, 'company 6');
        expect(result[0]).toBe(mockCompany[5]);
    });
});
