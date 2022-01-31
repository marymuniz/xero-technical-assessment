import 'reflect-metadata';
import { WebElement } from 'selenium-webdriver';
import { Browser } from './browser';

export const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export function findBy(selector: string) {
  return (target: any, propertyKey: string) => {
    const type = Reflect.getMetadata('design:type', target, propertyKey);
    Object.defineProperty(target, propertyKey, {
        configurable: true,
        enumerable: true,
        get: function() {
          const promise = (this as any).browser.findElement(selector);
          return new type(promise, selector);
        },
    });
  };
}


export async function findAsync<T>(
  array: T[],
  predicate: (t: T) => Promise<boolean>,
): Promise<T | undefined> {
  for (const t of array) {
    if (await predicate(t)) {
      return t;
    }
  }
  return undefined;
}

export async function findVisible(browser: Browser, selector: string): Promise<WebElement> {
  const elements = await browser.findElements(selector);
  
  for (let i = 0; i < elements.length; i++) {
      const isDisplayed = await elements[i].isDisplayed();
      if (isDisplayed) {
        return elements[i];
      }
  }

  throw new Error(`No visible element found for selector ${selector}`);
}

export function getRandomNumber() {
  return Math.floor(Math.random() * 10000000);
}
