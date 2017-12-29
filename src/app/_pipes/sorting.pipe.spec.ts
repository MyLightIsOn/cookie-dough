import { SortingPipe } from './sorting.pipe';

describe('SortingPipe', () => {
    it('create an instance', () => {
        const pipe = new SortingPipe();
        expect(pipe).toBeTruthy();
    });

    it('should sort ascending', () => {
        const pipe = new SortingPipe();
        const array = [{'id': '5'}, {'id': '4'}, {'id': '3'}, {'id': '2'}, {'id': '1'}];
        const sortedArray = [{'id': '1'}, {'id': '2'}, {'id': '3'}, {'id': '4'}, {'id': '5'}];

        const ascArray = array.sort(pipe.transform('id', 'asc'));
        expect(ascArray).toEqual(sortedArray);
    });

    it('should sort descending', () => {
        const pipe = new SortingPipe();
        const array = [{'id': '5'}, {'id': '4'}, {'id': '3'}, {'id': '2'}, {'id': '1'}];
        const sortedArray = [{'id': '1'}, {'id': '2'}, {'id': '3'}, {'id': '4'}, {'id': '5'}];

        const descArray = sortedArray.sort(pipe.transform('id', 'desc'));
        expect(descArray).toEqual(array);
    });

    it('should sort numbers and ignore unmatched keys', () => {
        const pipe = new SortingPipe();
        const sortedArray = [{'id': 1}, {'id': 2}, {'id': 3}, {'id': 4}, {'idd': 5}];

        const newArr = sortedArray.sort(pipe.transform('id', 'desc'));
        expect(newArr).toEqual([{'id': 4}, {'id': 3}, {'id': 2}, {'id': 1}, {'idd': 5}]);
    });
});
