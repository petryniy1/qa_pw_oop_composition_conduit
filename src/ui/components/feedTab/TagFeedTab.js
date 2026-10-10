import { BaseComponent } from '../BaseComponent';
import { expect } from '../../../common/helpers/pw';
import { ArticleFeedItem } from './ArticleFeedItem';

export class TagFeedTab extends BaseComponent {
  constructor(page, userId = 0) {
    super(page, userId);
    this.articleFeedItem = new ArticleFeedItem(this.page, userId);
  }

  #tagFeedLink(tagName) {
    return this.page
      .locator('.feed-toggle')
      .getByRole('listitem')
      .filter({ hasText: tagName });
  }

  async open(tagName) {
    await this.step(`Open '${tagName}' tag feed tab`, async () => {
      await this.#tagFeedLink(tagName).click();
    });
  }

  async assertTabLinkVisible(tagName) {
    await this.step(`Assert '${tagName}' tag feed tab is visible`, async () => {
      await expect(this.#tagFeedLink(tagName)).toBeVisible();
    });
  }
}
