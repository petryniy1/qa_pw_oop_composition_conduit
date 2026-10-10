import { BaseArticleContentBlock } from './BaseArticleContentBlock';
import { expect } from '../../../common/helpers/pw';

export class AuthorsArticleContentBlock extends BaseArticleContentBlock {
  #editArticleLink() {
    return this.page.getByRole('link', { name: 'Edit Article' }).first();
  }

  #deleteArticleButton() {
    return this.page.getByRole('button', { name: 'Delete Article' }).first();
  }

  async clickEditArticleLink() {
    await this.step(`Click 'Edit Article' link`, async () => {
      await this.#editArticleLink().click();
    });
  }

  async clickDeleteArticleButton() {
    await this.step(`Click 'Delete Article' button`, async () => {
      await this.#deleteArticleButton().click();
    });
  }

  async assertEditArticleLinkIsVisible() {
    await this.step(`Assert 'Edit Article' link is visible`, async () => {
      await expect.soft(this.#editArticleLink()).toBeVisible();
    });
  }

  async assertDeleteArticleButtonIsVisible() {
    await this.step(`Assert 'Delete Article' button is visible`, async () => {
      await expect.soft(this.#deleteArticleButton()).toBeVisible();
    });
  }
}
