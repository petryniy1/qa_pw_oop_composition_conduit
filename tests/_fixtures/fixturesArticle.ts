import { test as base } from './fixturesGeneric';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { InternalViewArticlePage } from '../../src/ui/pages/article/InternalViewArticlePage';

type Article = ReturnType<typeof generateNewArticleData> & { url?: string };

export const test = base.extend<{
  articleWithoutTags: Article;
  articleWithOneTag: Article;
  createArticlePage: CreateArticlePage;
  internalViewArticlePage: InternalViewArticlePage;
}>({
  articleWithoutTags: async ({ logger }, use) => {
    const article = generateNewArticleData(logger as any);

    await use(article);
  },
  articleWithOneTag: async ({ logger }, use) => {
    const article = generateNewArticleData(logger as any, 1);

    await use(article);
  },
  createArticlePage: async ({ page }, use) => {
    const createArticlePage = new CreateArticlePage(page);

    await use(createArticlePage);
  },
  internalViewArticlePage: async ({ page }, use) => {
    const internalViewArticlePage = new InternalViewArticlePage(page);

    await use(internalViewArticlePage);
  },
});
