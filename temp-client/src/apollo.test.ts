import { client } from './apollo';

describe('Apollo Client', () => {
  it('should be defined', () => {
    expect(client).toBeDefined();
  });

  it('should have the correct URI', () => {
    expect(client.link).toBeDefined();
  });
});
