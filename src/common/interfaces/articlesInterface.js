import { testStep, expect } from '../helpers/pw';
import { ExternalHomePage } from '../../ui/pages/home/ExternalHomePage';
import { ExternalViewArticlePage } from '../../ui/pages/article/ExternalViewArticlePage';

/**
 * TEMPORARY workaround, the problem has been reported to the developers.
 * The home page of a not logged in user is server-rendered and cached for ~10s
 * (Cache-Control: s-maxage=10), so a new article shows up in the Global Feed
 * only after the cache expires. Remove the retries once the cache is fixed.
 */
export async function waitForArticleInGlobalFeed(
  page,
  article,
  userId = 0,
  timeout = 30000,
) {
  await testStep(
    `Wait until '${article.title}' article appears in the Global Feed`,
    async () => {
      const homePage = new ExternalHomePage(page, userId);

      await expect(async () => {
        await homePage.open();
        await homePage.globalFeed.articleFeedItem.assertArticleTitleIsVisible(
          article.title,
          { soft: false, timeout: 1000 },
        );
      }).toPass({ timeout, intervals: [1000, 2000, 3000] });
    },
    userId,
  );
}

export async function assertArticleContent(page, article, author, userId = 0) {
  await testStep(
    `Assert the article page shows the correct title, author and text`,
    async () => {
      const { articleContentBlock } = new ExternalViewArticlePage(page, userId);

      await articleContentBlock.assertArticleTitleIsVisible(article.title);
      await articleContentBlock.assertArticleAuthorNameIsVisible(
        author.username,
      );
      await articleContentBlock.assertArticleTextIsVisible(article.text);
    },
    userId,
  );
}
