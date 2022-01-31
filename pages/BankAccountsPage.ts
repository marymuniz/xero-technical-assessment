import config from "../config";
import { Browser, Button, elementIsVisible, findBy, Page, pageHasLoaded, WaitCondition } from "../lib";
import { BankSearchPage } from "./BankSearchPage";

export class BankAccountsPage extends Page {
    constructor (browser: Browser) {
        super(browser);
        this.setUrl(config.bankAccountsUrl);
    }

    @findBy('[data-automationid="Add Bank Account-button"]')
    public AddBankAccount: Button;

    public loadCondition(): WaitCondition {
        return elementIsVisible(() => this.AddBankAccount);
    }

    public async addBankAccount() {
        await this.AddBankAccount.click();
        await this.browser.wait(pageHasLoaded(BankSearchPage));
    }
}

