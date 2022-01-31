import config from "../config";
import { Browser, Button, elementIsVisible, findBy, Page, pageHasLoaded, TextInput, WaitCondition } from "../lib";
import { TwoFactorPage } from "./TwoFactorPage";

export class LoginPage extends Page {

    constructor (browser: Browser) {
        super(browser);
        this.setUrl(config.loginUrl);
    }

    @findBy('[data-automationid="Username--input"]')
    public Email: TextInput;

    @findBy('[data-automationid="PassWord--input"]')
    public Password: TextInput;

    @findBy('[data-automationid="LoginSubmit--button"]')
    public Login: Button;

    public loadCondition(): WaitCondition {
        return elementIsVisible(() => this.Email);
    }

    public async login(email: string, password: string) {
        await this.Email.type(email);
        await this.Password.type(password);
        await this.Login.click();
        await this.browser.wait(pageHasLoaded(TwoFactorPage));
    }

    public async loginWithDefaultCredentials() {
        return await this.login(
            config.defaultCredentials.email, 
            config.defaultCredentials.password);
    }
}
