import { expect } from 'chai';

import toJSON from '../src/utils';

describe('Utils', () => {
  it('should exist method toJSON', () => {
    expect(toJSON).to.exist;
  });
});
