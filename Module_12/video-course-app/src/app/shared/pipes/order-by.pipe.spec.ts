import { OrderByPipe } from './order-by.pipe';
import { Course } from '../models/course';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;

  const courses: Course[] = [
    {
      id: 2,
      title: 'Lorem ipsum dolor sit amet',
      creationDate: new Date(2019, 2, 15),
      description: 'Test Course 2/5 Description',
      duration: 900,
      topRated: false,
      authors: []
    },
    {
      id: 1,
      title: 'Phasellus vitae libero id velit efficitur',
      creationDate: new Date(2018, 5, 1),
      description: 'Test Course 1/5 Description',
      duration: 1800,
      topRated: false,
      authors: []
    },
    {
      id: 3,
      title: 'Morbi fringilla consequat ligula',
      creationDate: new Date(2017, 1, 5),
      description: 'Test Course 3/5 Description',
      duration: 1000,
      topRated: false,
      authors: []
    },
    {
      id: 4,
      title: 'Nullam non lectus pretium',
      creationDate: new Date(2025, 0, 1),
      description: 'Test Course 4/5 Description',
      duration: 100,
      topRated: false,
      authors: []
    },
    {
      id: 5,
      title: 'Vestibulum mattis fringilla ipsum',
      creationDate: new Date(),
      description: 'Test Course 5/5 Description',
      duration: 200,
      topRated: false,
      authors: []
    }
  ];

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('create an ordered list by creationDate', () => {
    const results = pipe.transform(courses, 'creationDate');
    for (let i = 1; i < results.length; i++) {
      expect(results[i].creationDate > results[i - 1].creationDate).toBeTrue();
    }
  });

  it('create an ordered list by ID', () => {
    const results = pipe.transform(courses, 'id');
    for (let i = 1; i < results.length; i++) {
      expect(results[i].id >= results[i - 1].id).toBeTrue();
    }
  });

  it('create an ordered list by duration', () => {
    const results = pipe.transform(courses, 'duration');
    for (let i = 1; i < results.length; i++) {
      expect(results[i].duration >= results[i - 1].duration).toBeTrue();
    }
  });
});
