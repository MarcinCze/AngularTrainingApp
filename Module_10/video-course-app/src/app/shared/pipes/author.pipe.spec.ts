import { AuthorPipe } from './author.pipe';

describe('AuthorPipe', () => {
  it('create an instance', () => {
    const pipe = new AuthorPipe();
    expect(pipe).toBeTruthy();
  });

  it('should connect first and last name', () => {
    const pipe = new AuthorPipe();
    expect(pipe.transform({ firstName: 'Test', lastName: 'Testowy' })).toEqual('Test Testowy');
  });
});
