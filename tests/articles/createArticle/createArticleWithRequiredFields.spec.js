import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let article;

test.beforeEach(async ({ page, user, logger }) => {
  article = generateNewArticleData(logger);

  await signUpUser(page, user);
});

test('Creat an article with required fields', async ({
  internalHomePage,
  createArticlePage,
  internalViewArticlePage,
}) => {
  await internalHomePage.header.clickNewArticleLink();

  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.fillDescriptionField(article.description);
  await createArticlePage.fillTextField(article.text);
  await createArticlePage.clickPublishArticleButton();

  await internalViewArticlePage.articleContentBlock.assertArticleTitleIsVisible(
    article.title,
  );
  await internalViewArticlePage.articleContentBlock.assertArticleTextIsVisible(
    article.text,
  );
});
