import { BaseComponent } from './BaseComponent';
import { expect } from '../../common/helpers/pw';

export class PopularTags extends BaseComponent {
  #tagPill(tagName) {
    return this.page.locator('.sidebar').getByText(tagName, { exact: true });
  }

  async clickTag(tagName) {
    await this.step(
      `Click '${tagName}' tag in the Popular Tags list`,
      async () => {
        await this.#tagPill(tagName).click();
      },
    );
  }

  async assertTagIsVisible(tagName) {
    await this.step(
      `Assert '${tagName}' tag is visible in the Popular Tags list`,
      async () => {
        await expect(this.#tagPill(tagName)).toBeVisible();
      },
    );
  }
}
