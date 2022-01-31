import config from "../config";
import { Browser, elementIsVisible, findBy, Page, WaitCondition, WebComponent } from "../lib";

export class DashboardPage extends Page {
    constructor (browser: Browser) {
        super(browser);
        this.setUrl(config.dashboardUrl);
    }
    @findBy('[data-name="navigation-menu/dashboard"]')
    public DashboardMenu: WebComponent;

    public loadCondition(): WaitCondition {
        return elementIsVisible(() => this.DashboardMenu);
    }
}