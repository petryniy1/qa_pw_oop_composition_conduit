import { BaseComponent } from '../BaseComponent';
import { expect } from '../../../common/helpers/pw';

export class ArticleFeedItem extends BaseComponent {
  #articleTitleHeading(title) {
    return this.page.locator('h1').filter({ hasText: title });
  }

  #authorLink(username) {
    return this.page.locator('a.author').filter({ hasText: username });
  }

  async openArticle(title) {
    await this.step(`Open '${title}' article from the feed`, async () => {
      await this.#articleTitleHeading(title).click();
    });
  }

  async assertArticleTitleIsVisible(title, { soft = true, timeout } = {}) {
    await this.step(
      `Assert '${title}' article is visible in the feed`,
      async () => {
        const assertion = soft ? expect.soft : expect;

        await assertion(this.#articleTitleHeading(title)).toBeVisible({
          timeout,
        });
      },
    );
  }

  async assertArticleAuthorIsVisible(username) {
    await this.step(
      `Assert '${username}' is shown as the article author in the feed`,
      async () => {
        await expect.soft(this.#authorLink(username)).toBeVisible();
      },
    );
  }
}
