import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user, articleWithOneTag }) => {
  await signUpUser(page, user);
  await createArticle(page, articleWithOneTag);
});

test(
  'Logged-in user can find own article by Tag from the Popular tags ' +
    'section and view in the Tag Feed',
  async ({ articleWithOneTag, internalHomePage }) => {
    const [tag] = articleWithOneTag.tags;

    await internalHomePage.open();

    await internalHomePage.popularTags.assertTagIsVisible(tag);

    await internalHomePage.popularTags.clickTag(tag);

    await internalHomePage.tagFeed.assertTabLinkVisible(tag);
    await internalHomePage.tagFeed.articleFeedItem.assertArticleTitleIsVisible(
      articleWithOneTag.title,
    );
  },
);
