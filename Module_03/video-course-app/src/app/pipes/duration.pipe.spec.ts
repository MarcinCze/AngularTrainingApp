import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('create proper output for 150min', () => {
    expect(pipe.transform(150)).toBe('2h 30min');
  });

  it('create proper output for 10min', () => {
    expect(pipe.transform(10)).toBe('0h 10min');
  });

  it('create proper output for 180min', () => {
    expect(pipe.transform(180)).toBe('3h 0min');
  });

  it('create proper output for 1min', () => {
    expect(pipe.transform(1)).toBe('0h 1min');
  });
});
