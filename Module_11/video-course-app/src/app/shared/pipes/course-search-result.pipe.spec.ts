import { CourseSearchResultPipe } from './course-search-result.pipe';
import { Course } from '../models/course';

describe('CourseSearchResultPipe', () => {
  let pipe: CourseSearchResultPipe;

  const courses: Course[] = [
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet',
      creationDate: new Date(2018, 2, 15),
      description: 'Test Course 1/5 Description',
      duration: 900,
      topRated: false,
      authors: []
    },
    {
      id: 2,
      title: 'Phasellus vitae libero id velit efficitur',
      creationDate: new Date(2019, 5, 1),
      description: 'Test Course 2/5 Description',
      duration: 400,
      topRated: false,
      authors: []
    },
    {
      id: 3,
      title: 'Morbi fringilla consequat ligula',
      creationDate: new Date(2020, 1, 5),
      description: 'Test Course 3/5 Description',
      duration: 400,
      topRated: false,
      authors: []
    },
    {
      id: 4,
      title: 'Nullam non lectus pretium',
      creationDate: new Date(2025, 0, 1),
      description: 'Test Course 4/5 Description',
      duration: 400,
      topRated: false,
      authors: []
    },
    {
      id: 5,
      title: 'Vestibulum mattis fringilla ipsum',
      creationDate: new Date(),
      description: 'Test Course 5/5 Description',
      duration: 400,
      topRated: false,
      authors: []
    }
  ];

  beforeEach(() => {
    pipe = new CourseSearchResultPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be visible - searchWord: ipsum', () => {
    expect(pipe.transform(courses[0].title, 'ipsum')).toBeTrue();
    expect(pipe.transform(courses[1].title, 'ipsum')).toBeFalse();
    expect(pipe.transform(courses[2].title, 'ipsum')).toBeFalse();
    expect(pipe.transform(courses[3].title, 'ipsum')).toBeFalse();
    expect(pipe.transform(courses[4].title, 'ipsum')).toBeTrue();
  });

  it('should be visible - searchWord: null', () => {
    expect(pipe.transform(courses[0].title, null)).toBeTrue();
    expect(pipe.transform(courses[1].title, null)).toBeTrue();
    expect(pipe.transform(courses[2].title, null)).toBeTrue();
    expect(pipe.transform(courses[3].title, null)).toBeTrue();
    expect(pipe.transform(courses[4].title, null)).toBeTrue();
  });

  it('should be visible - searchWord: undefined', () => {
    expect(pipe.transform(courses[0].title, undefined)).toBeTrue();
    expect(pipe.transform(courses[1].title, undefined)).toBeTrue();
    expect(pipe.transform(courses[2].title, undefined)).toBeTrue();
    expect(pipe.transform(courses[3].title, undefined)).toBeTrue();
    expect(pipe.transform(courses[4].title, undefined)).toBeTrue();
  });

  it('should be visible - searchWord: empty string', () => {
    expect(pipe.transform(courses[0].title, '')).toBeTrue();
    expect(pipe.transform(courses[1].title, '')).toBeTrue();
    expect(pipe.transform(courses[2].title, '')).toBeTrue();
    expect(pipe.transform(courses[3].title, '')).toBeTrue();
    expect(pipe.transform(courses[4].title, '')).toBeTrue();
  });

  it('should be visible - searchWord: marcin', () => {
    expect(pipe.transform(courses[0].title, 'marcin')).toBeFalse();
    expect(pipe.transform(courses[1].title, 'marcin')).toBeFalse();
    expect(pipe.transform(courses[2].title, 'marcin')).toBeFalse();
    expect(pipe.transform(courses[3].title, 'marcin')).toBeFalse();
    expect(pipe.transform(courses[4].title, 'marcin')).toBeFalse();
  });

  it('should be visible - searchWord: fringilla', () => {
    expect(pipe.transform(courses[0].title, 'fringilla')).toBeFalse();
    expect(pipe.transform(courses[1].title, 'fringilla')).toBeFalse();
    expect(pipe.transform(courses[2].title, 'fringilla')).toBeTrue();
    expect(pipe.transform(courses[3].title, 'fringilla')).toBeFalse();
    expect(pipe.transform(courses[4].title, 'fringilla')).toBeTrue();
  });
});
