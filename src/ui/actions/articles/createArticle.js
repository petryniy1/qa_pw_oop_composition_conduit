import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { InternalViewArticlePage } from '../../pages/article/InternalViewArticlePage';
import { testStep } from '../../../common/helpers/pw';

export async function createArticle(page, article, userId = 0) {
  article['url'] = await testStep(
    `Create an article`,
    async () => {
      const createArticlePage = new CreateArticlePage(page, userId);
      const internalViewArticlePage = new InternalViewArticlePage(page, userId);
      const { articleContentBlock } = internalViewArticlePage;

      await createArticlePage.open();
      await createArticlePage.submitCreateArticleForm(article);
      await articleContentBlock.assertArticleTitleIsVisible(article.title);

      return internalViewArticlePage.getCurrentPageUrl();
    },
    userId,
  );

  return article;
}
