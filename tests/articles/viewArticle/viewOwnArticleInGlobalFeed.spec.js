import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user, articleWithoutTags }) => {
  await signUpUser(page, user);
  await createArticle(page, articleWithoutTags);
});

test('Logged-in user can view own article in the Global Feed', async ({
  articleWithoutTags,
  internalHomePage,
}) => {
  await internalHomePage.open();
  await internalHomePage.globalFeed.open();

  await internalHomePage.globalFeed.articleFeedItem.assertArticleTitleIsVisible(
    articleWithoutTags.title,
  );
});
