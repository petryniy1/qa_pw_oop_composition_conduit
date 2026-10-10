import { test } from '../../_fixtures/fixtures';
import { ExternalHomePage } from '../../../src/ui/pages/home/ExternalHomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import {
  waitForArticleInGlobalFeed,
  assertArticleContent,
} from '../../../src/common/interfaces/articlesInterface';

test.use({ contextsNumber: 2, usersNumber: 1 });

test.beforeEach(async ({ pages, users, articleWithoutTags }) => {
  await signUpUser(pages[0], users[0], 1);
  await createArticle(pages[0], articleWithoutTags, 1);
});

test(
  'Not logged in user can view the article created by other user ' +
    'in the Global Feed section',
  async ({ articleWithoutTags, pages, users }) => {
    const homePage = new ExternalHomePage(pages[1]);

    await waitForArticleInGlobalFeed(pages[1], articleWithoutTags);

    await homePage.globalFeed.articleFeedItem.assertArticleAuthorIsVisible(
      users[0].username,
    );
  },
);

test(
  'Not logged in user can open the article page created by other user ' +
    'from the Global Feed section',
  async ({ articleWithoutTags, pages, users }) => {
    const homePage = new ExternalHomePage(pages[1]);

    await waitForArticleInGlobalFeed(pages[1], articleWithoutTags);
    await homePage.globalFeed.articleFeedItem.openArticle(
      articleWithoutTags.title,
    );

    await assertArticleContent(pages[1], articleWithoutTags, users[0]);
  },
);
