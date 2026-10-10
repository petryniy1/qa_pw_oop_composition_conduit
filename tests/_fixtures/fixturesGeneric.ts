import { test as base, Page } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import * as allure from 'allure-js-commons';
import { parseTestTreeHierarchy } from '../../src/common/helpers/allureHelpers';

type User = ReturnType<typeof generateNewUserData>;

export const test = base.extend<
  {
    usersNumber: number;
    contextsNumber: number;
    pages: Page[];
    user: User;
    users: User[];
    infoTestLog: void;
    addAllureTestHierarchy: void;
  },
  {
    logger: Logger;
  }
>({
  usersNumber: [1, { option: true }],
  contextsNumber: [1, { option: true }],
  pages: async ({ browser, contextsNumber }, use) => {
    let pages = Array(contextsNumber);

    for (let i = 0; i < contextsNumber; i++) {
      const context = await browser.newContext();

      pages[i] = await context.newPage();
    }
    await use(pages);
  },
  user: async ({ logger }, use) => {
    const user = generateNewUserData(logger as any);

    await use(user);
  },
  users: async ({ logger, usersNumber }, use) => {
    const users = Array(usersNumber);

    for (let i = 0; i < usersNumber; i++) {
      users[i] = generateNewUserData(logger as any);
    }

    await use(users);
  },
  logger: [
    async ({}, use) => {
      const logger = new Logger('error');

      await use(logger);
    },
    { scope: 'worker' },
  ],
  infoTestLog: [
    async ({ logger }, use, testInfo) => {
      const normalizedFile = testInfo.file.replace(/\\/g, '/');
      const indexOfTestSubfolderStart = normalizedFile.indexOf('/tests') + 7;
      const fileName = normalizedFile.substring(indexOfTestSubfolderStart);

      logger.info(`Test started: ${fileName}`);

      await use();

      logger.info(`Test completed: ${fileName}`);
    },
    { scope: 'test', auto: true },
  ],
  addAllureTestHierarchy: [
    async ({ logger }, use, testInfo) => {
      const fileName = testInfo.file;

      const [parentSuite, suite, subSuite] = parseTestTreeHierarchy(
        fileName,
        logger,
      );

      await allure.parentSuite(parentSuite);
      await allure.suite(suite);
      if (subSuite) {
        await allure.subSuite(subSuite);
      }

      await use();
    },
    { scope: 'test', auto: true },
  ],
});
