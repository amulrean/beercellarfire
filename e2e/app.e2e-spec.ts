import { BeercellarfirePage } from './app.po';

describe('beercellarfire App', function() {
  let page: BeercellarfirePage;

  beforeEach(() => {
    page = new BeercellarfirePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
