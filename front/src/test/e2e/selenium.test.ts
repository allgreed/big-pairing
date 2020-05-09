// eslint-disable-next-line no-unused-vars
import {Builder, By, Key, until, WebDriver} from 'selenium-webdriver';


async function findAndWrite(driver: WebDriver, name: string, valueToWrite: string) {
  await driver.wait(until.elementLocated(By.name(name)));
  await driver.findElement(By.name(name)).sendKeys(Key.BACK_SPACE);
  await driver.findElement(By.name(name)).sendKeys(Key.BACK_SPACE);
  await driver.findElement(By.name(name)).sendKeys(valueToWrite);
}

test('E2E: App should send correct request', async () => {
  const driver = new Builder()
    .forBrowser('chrome')
    .build();

  await driver.get('localhost:3000');

  await findAndWrite(driver, 'name', 'Piotr');
  await findAndWrite(driver, 'email', 'oneat@vp.pl');
  driver.findElement(By.name('Male')).click();

  await findAndWrite(driver, 'extroversion', '21');
  await findAndWrite(driver, 'neuroticism', '37');
  await findAndWrite(driver, 'agreeableness', '42');
  await findAndWrite(driver, 'conscientiousness', '69');
  await findAndWrite(driver, 'openness_to_experience', '96');


  await driver.findElement(By.name('submit')).click();

  await driver.quit();
});
