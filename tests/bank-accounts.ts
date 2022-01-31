import { Browser, delay, ensure, getRandomNumber } from "../lib";
import { AllPages } from "../pages";

describe('Bank Accounts', () => {
    let pages: AllPages;

    beforeEach(async () => {
        pages = new AllPages(new Browser('chrome'));
        await pages.login.navigate();
        await pages.login.loginWithDefaultCredentials();
        await pages.twofactor.answerSecurityQuestions();

    });

    context('Creating ANZ (NZ) banking accounts', () => {
        let accountName: string;

        beforeEach(async () => {
            // Arrange
            await pages.bankaccounts.navigate();
            await pages.bankaccounts.addBankAccount();
            await pages.bankSearch.selectBank('ANZ (NZ)');
            accountName = `Test account ${getRandomNumber()}`; 
        });

        it('should create an ANZ (NZ) account', async () => {

            // Act
            await pages.bankingaccount.fillForm(accountName, 1, '02020202020202020202');
        });

        it('shoud create an ANZ (NZ) account using hifen and letters', async () => {
            // Act
            await pages.bankingaccount.fillForm(accountName, 1, '06-4444-0707070-SSS');
        });

        it('should create an ANZ (NZ) Credit Card account', async () => {
            // Act
            await pages.bankingaccount.fillCreditCardForm(accountName, 3, '7777');
        });


        afterEach(async () => {
            await delay(1000); // TODO: not ideal, find a better solution. If click in the Continue button happens without the delay the validation is failing
            
            await pages.bankingaccount.continueAndWaitNextPage();
    
            // Assert
            await ensure(pages.downloadForm).hasText(accountName);
        });
    });


    context('Validate scenarios when the form is incomplete', async () => {
        beforeEach(async () => {
            // Arrange
            await pages.bankaccounts.navigate();
            await pages.bankaccounts.addBankAccount();
            await pages.bankSearch.selectBank('ANZ (NZ)');
        });

        it('should display errors when Account Name and Account Type are not populated', async () => {

            // Act
            await pages.bankingaccount.Continue.click();
    
            // Assert
            await Promise.all([ // runs in parallel
                // assert fields have a red border
                ensure(pages.bankingaccount.AccountName).hasClass('x-form-invalid-field'),
                ensure(pages.bankingaccount.AccountType).hasClass('x-form-invalid-field'),
                ensure(pages.bankingaccount).hasText('Account Name required')
            ]);
        });

        it('should display an error when Account Number is not populated', async () => {
            
            // Act
            const accountName = `Test account ${getRandomNumber()}`; 
            await pages.bankingaccount.fillForm(accountName, 1, '');

            await delay(1000);
            await pages.bankingaccount.Continue.click();

            // Assert
            await ensure(pages.bankingaccount).hasText('Account Number required')
        });

        it('should display an error when Credit Card Number is not populated', async () => {
            // Act
            const accountName = `Test account ${getRandomNumber()}`; 
            await pages.bankingaccount.fillCreditCardForm(accountName, 3, '');

            await delay(1000);
            await pages.bankingaccount.Continue.click();

            // Assert
            await ensure(pages.bankingaccount).hasText('Last 4 digits required')
        });

        it('should display an error when Credit Card Number is populated using less than 4 digits', async () => {
            // Act
            const accountName = `Test account ${getRandomNumber()}`; 
            await pages.bankingaccount.fillCreditCardForm(accountName, 3, '123');

            await delay(1000);
            await pages.bankingaccount.Continue.click();

            // Assert
            await ensure(pages.bankingaccount).hasText('Please enter 4 digits for your Credit Card Number');
        });

        it('should display an error when the Account Name is duplicated', async () => {
            // Arrange
            const accountName = `Test account ${getRandomNumber()}`; 
            await pages.bankingaccount.fillForm(accountName, 1, '02440202020202020202');
            await delay(1000); // TODO: not ideal, find a better solution. If click in the Continue button happens without the delay the validation is failing
            await pages.bankingaccount.continueAndWaitNextPage();
            await delay(1000);
            await pages.bankaccounts.navigate();
            await pages.bankaccounts.addBankAccount();
            await pages.bankSearch.selectBank('ANZ (NZ)');

            // Act
            await pages.bankingaccount.fillForm(accountName, 1, '02440202020202020202');
            await delay(1000);
            await pages.bankingaccount.Continue.click();
            await delay(5000); // To validate this scenario I needed to add some time to go to the BD and return if the name already exists.

            // Assert
            await ensure(pages.bankingaccount).hasText('Please enter a unique Name');
        });
    });

    afterEach(async () => {
        await pages.dispose();
    });
});
