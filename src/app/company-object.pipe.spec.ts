import { CompanyObjectPipe } from './company-object.pipe';

describe('CompanyObjectPipe', () => {
  it('create an instance', () => {
    const pipe = new CompanyObjectPipe();
    expect(pipe).toBeTruthy();
  });
});
