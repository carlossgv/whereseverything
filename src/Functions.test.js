import { getImageInfo, checkClick } from './Functions';

test('check if stuff matches', () => {
  expect(checkClick(1, 1, 'boxOfVinyl', 'showsImage')).toBe('boxOfVinyl');
});
