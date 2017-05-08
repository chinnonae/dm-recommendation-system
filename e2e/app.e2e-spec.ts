import { DmRecommendationSystemPage } from './app.po';

describe('dm-recommendation-system App', function() {
  let page: DmRecommendationSystemPage;

  beforeEach(() => {
    page = new DmRecommendationSystemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
