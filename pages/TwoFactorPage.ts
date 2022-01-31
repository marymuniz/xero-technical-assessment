import config from "../config";
import { Browser, Button, elementIsVisible, findBy, Page, pageHasLoaded, TextInput, WaitCondition, WebComponent } from "../lib";
import { DashboardPage } from "./DashboardPage";

export class TwoFactorPage extends Page {
    constructor (browser: Browser) {
        super(browser);
    }

    @findBy('[data-automationid="auth-continuebutton"]')
    public UseAnotherAuthentication: Button;

    @findBy('[data-automationid="auth-authwithsecurityquestionsbutton"]')
    public SecurityQuestions: Button;

    @findBy('[data-automationid="auth-firstanswer--label"]')
    public FirstAnswerLabel: WebComponent;

    @findBy('[data-automationid="auth-firstanswer--input"]')
    public FirstAnswer: TextInput;

    @findBy('[data-automationid="auth-secondanswer--label"]')
    public SecondAnswerLabel: WebComponent;

    @findBy('[data-automationid="auth-secondanswer--input"]')
    public SecondAnswer: TextInput;

    @findBy('[data-automationid="auth-submitanswersbutton"]')
    public Confirm: Button;

    public loadCondition(): WaitCondition {
        return elementIsVisible(() => this.UseAnotherAuthentication);
    }

    public async answerSecurityQuestions() {
        await this.UseAnotherAuthentication.click();
        await this.SecurityQuestions.click();

        const firstSecurityQuestion = await this.FirstAnswerLabel.getText();
        const secondSecurityQuestion = await this.SecondAnswerLabel.getText();

        await this.FirstAnswer.type(config.twoFactorSecurityQuestions[firstSecurityQuestion]);
        await this.SecondAnswer.type(config.twoFactorSecurityQuestions[secondSecurityQuestion]);

        await this.Confirm.click();
        await this.browser.wait(pageHasLoaded(DashboardPage));
    }
}