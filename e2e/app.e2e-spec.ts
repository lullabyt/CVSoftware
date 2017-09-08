import { CvsPage } from './app.po';

describe('cvs App', () => {
  let page: CvsPage;

  beforeEach(() => {
    page = new CvsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
