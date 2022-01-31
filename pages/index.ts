import { Browser } from "../lib";
import { BankAccountsPage } from "./BankAccountsPage";
import { BankingAccountPage } from "./BankingAccountPage";
import { BankSearchPage } from "./BankSearchPage";
import { DashboardPage } from "./DashboardPage";
import { DownloadFormPage } from "./DownloadFilePage";
import { LoginPage } from "./LoginPage";
import { TwoFactorPage } from "./TwoFactorPage";

export class AllPages {
    public login: LoginPage;
    public twofactor: TwoFactorPage;
    public bankaccounts: BankAccountsPage;
    public dashboard: DashboardPage;
    public bankingaccount: BankingAccountPage;
    public bankSearch: BankSearchPage;
    public downloadForm: DownloadFormPage;

    constructor(
        public browser: Browser
    ) {
        this.login = new LoginPage(browser);
        this.twofactor = new TwoFactorPage(browser);
        this.bankaccounts = new BankAccountsPage(browser);
        this.dashboard = new DashboardPage(browser);
        this.bankingaccount = new BankingAccountPage(browser);
        this.bankSearch = new BankSearchPage(browser);
        this.downloadForm = new DownloadFormPage(browser);
    }

    public async dispose() {
        await this.browser.close();
    }
}