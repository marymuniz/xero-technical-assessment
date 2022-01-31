import { Button, TextInput, WebComponent } from './';
import { Page } from './page';

class WebComponentEnsurer {
  constructor(private component: WebComponent) {
  }

  public async textIs(expected: string) {
    const text = await this.component.getText();

    if (expected.trim() !== text.trim()) {
      throw new Error(`Element ${this.component.selector} text is '${text}'. Expected value is '${expected}'`);
    }
  }

  public async isVisible() {
    if (!await this.component.isDisplayed()) {
      throw new Error(`Element ${this.component.selector} is visible`);
    }
  }

  public async isNotVisible() {
    if (await this.component.isDisplayed()) {
      throw new Error(`Element ${this.component.selector} is visible`);
    }
  }

  public async hasClass(expected: string) {
    const classes = await this.component.getClasses();

    const containsExpectedClass = classes.split(' ').includes(expected);
    if (!containsExpectedClass) {
      throw new Error(`Element ${this.component.selector} class is '${classes}'. Expected to contain '${expected}'`);
    }
  }
}

class ButtonEnsurer extends WebComponentEnsurer {
  protected button: Button;
  constructor(button: Button) {
    super(button);
    this.button = button;
  }

  public async isNotDisabled() {
    if (await this.button.isDisabled()) {
      throw new Error(`Button ${this.button.selector} is disabled`);
    }
  }
}

class TextInputEnsurer extends WebComponentEnsurer {
  constructor(element: TextInput) {
    super(element);
  }
}

class PageEnsurer {
  constructor(private page: Page) {}

  public async hasText(expected: string) {
    const body = await this.page.getBody();
    const bodyText = await body.getText();
    if (!bodyText.includes(expected)) {
      throw new Error(`Page does not contains '${expected}'`);
    }
  }
}

export function ensure(component: Button): ButtonEnsurer;
export function ensure(component: TextInput): TextInputEnsurer;
export function ensure(component: WebComponent): WebComponentEnsurer;
export function ensure(page: Page): PageEnsurer;
export function ensure(component: WebComponent | Button | Page): any {
    if (component instanceof Button) {
        return new ButtonEnsurer(component);
    } else if (component instanceof WebComponent) {
        return new WebComponentEnsurer(component);
    } else if (component instanceof Page) {
      return new PageEnsurer(component);
    }
}

