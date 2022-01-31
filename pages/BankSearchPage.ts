import { Browser, elementIsVisible, findAsync, findBy, Page, pageHasLoaded, WaitCondition, WebComponent } from "../lib";
import { BankingAccountPage } from "./BankingAccountPage";

export class BankSearchPage extends Page {
    constructor (browser: Browser) {
        super(browser);
    }

    @findBy('[data-automationid="searchResults"]')
    public SearchResults: WebComponent;

    public loadCondition(): WaitCondition {
        return elementIsVisible(() => this.SearchResults);
    }


    public async selectBank(desiredBank: string) {
        // Get all banks
        const allBanks = await this.browser.findElements('[data-automationid="searchResults"] .bank-search-normal-text');
        
        // Search for the specified bank
        const selectedBank = await findAsync(allBanks, async (e) => (await e.getText()) === desiredBank);

        if (selectedBank === null) {
            throw Error(`failed to find bank ${desiredBank}`);
        }

        await selectedBank?.click();
        await this.browser.wait(pageHasLoaded(BankingAccountPage));
    }
}