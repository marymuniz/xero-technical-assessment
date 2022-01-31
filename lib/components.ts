import { WebElement, WebElementPromise } from 'selenium-webdriver';

export class WebComponent {
  constructor(protected element: WebElementPromise | WebElement, public selector: string) { }

  public async click() {
    try {
      return await this.element.click();
    } catch (clickErr) {
      try {
        await this.element.getDriver().executeScript('arguments[0].click();', this.element);
      } catch (jsErr) {
        throw clickErr;
      }
    }
  }

  public async sendKeys(key: string | number) {
    return await this.element.sendKeys(key)
  }

  public async isDisplayed() {
    try {
      return await this.element.isDisplayed();
    } catch (ex) {
      return false;
    }
  }

  public async getText() {
    return await this.element.getText();
  }

  public async getClasses() {
    return await this.element.getAttribute('class')
  }
}

export class Button extends WebComponent {
  constructor(element: WebElementPromise | WebElement, selector: string) {
    super(element, selector);
  }

  public async isDisabled() {
    try {
      return await this.element.getAttribute('disabled') === 'disabled';
    } catch (ex) {
      return false;
    }
  }
}

export class TextInput extends WebComponent {
  constructor(element: WebElementPromise | WebElement, selector: string) {
    super(element, selector);
  }

  public type(text: string) {
    return this.element.sendKeys(text);
  }
}
