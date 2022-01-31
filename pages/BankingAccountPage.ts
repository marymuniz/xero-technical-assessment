import { Key } from "selenium-webdriver";
import { Browser, Button, elementIsVisible, findBy, findVisible, Page, pageHasLoaded, TextInput, WaitCondition, WebComponent } from "../lib";
import { DownloadFormPage } from "./DownloadFilePage";

export class BankingAccountPage extends Page {
    constructor (browser: Browser) {
        super(browser);
    }

    @findBy('[data-automationid="accountName"] input')
    public AccountName: TextInput;

    @findBy('[data-automationid="accountType"] input')
    public AccountType: WebComponent;

    @findBy('[data-automationid="creditCardNumber"] input')
    public CreditCardNumber: TextInput;

    @findBy('[data-automationid="addAccount"]')
    public AddAnotherAccount: Button;

    @findBy('[data-automationid="continueButton"]')
    public Continue: Button;

    public loadCondition(): WaitCondition {
        return elementIsVisible(() => this.AccountName);
    }

    public async getAccountNumber() {
        // The following selector returns multiple elements (check on chrome with $$(''))
        // so I'm using a custom method to select the visible element instead of the @findBy attribute
        const selector = '[data-automationid="accountNumber"] input';
        const visibleElement = await findVisible(this.browser, selector);

        return new TextInput(visibleElement, selector);
    }

    public async fillForm(accountName: string, accountTypeIndex: number, accountNumber: string) {
        await this.AccountName.type(accountName);

        // Using keyboard to select the account type based on the index as I coudn't find a selector for them
        await this.AccountType.click();
        for (let index = 0; index < accountTypeIndex; index++) {
            await this.AccountType.sendKeys(Key.DOWN);    
        }
        await this.AccountType.sendKeys(Key.ENTER);

        const accountNumberInput = await this.getAccountNumber();
        await accountNumberInput.type(accountNumber);
    }

    public async fillCreditCardForm(accountName: string, accountTypeIndex: number, creditCardNumber: string) {
        await this.AccountName.type(accountName);

        // Using keyboard to select the account type based on the index as I coudn't find a selector for them
        await this.AccountType.click();
        for (let index = 0; index < accountTypeIndex; index++) {
            await this.AccountType.sendKeys(Key.DOWN);    
        }
        await this.AccountType.sendKeys(Key.ENTER);

        await this.CreditCardNumber.type(creditCardNumber);

    }

    public async continueAndWaitNextPage() {
        await this.Continue.click();
        await this.browser.wait(pageHasLoaded(DownloadFormPage));
    }
}