import { Browser, elementIsVisible, findBy, Page, WaitCondition, WebComponent } from "../lib";

export class DownloadFormPage extends Page {
    constructor (browser: Browser) {
        super(browser);
    }

    @findBy('[data-automationid="account-list"]')
    public BankAccountsList: WebComponent

    public loadCondition(): WaitCondition {
        return elementIsVisible(() => this.BankAccountsList);
    }
}
