import { SerpentinehollowPage } from './app.po';

describe('serpentinehollow App', () => {
  let page: SerpentinehollowPage;

  beforeEach(() => {
    page = new SerpentinehollowPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
