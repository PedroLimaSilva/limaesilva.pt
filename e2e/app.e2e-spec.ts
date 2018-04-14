import { CVangularPage } from './app.po';

describe('cvangular App', () => {
  let page: CVangularPage;

  beforeEach(() => {
    page = new CVangularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
