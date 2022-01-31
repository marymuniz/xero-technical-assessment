How to execute the tests:
 - Update the parameters below in the .env file before run the tests or use the file I provided in my email with my own credentials and MFA questions.
    DEFAULT_EMAIL
    DEFAULT_PASSWORD
    MFA_QUESTIONS
 - npm install
 - npm test


Project structure:
   - lib:
   The lib I used is an existing one and some modifications were needed to attend some of the test scenarios.
   Project can be found here: https://github.com/goenning/typescript-selenium-example

   - pages
   I used Page Objects Pattern to ease the maintance of the tests, code reusability across tests and also thinking about the possibility to change the automation framework in the future and has less rework in the tests. A good example would be if Selenium Webdriver is replaced with Cypress.io we would be able to reutilise the tests and only the Page Objects would need to be implemented in Cypress.

   - tests
   Is where the test file is located :)

Improvements/Next Steps
   - Mocking APIs:
   This is a practice that I use in Cypress and is very useful to isolate the web interface tests because it decreases considerably the duration of the test and also the lines of code. In cases where test integration is required, then this practice is not ideal because the validation in the database is necessary.

   - I noticed that depending of the browser resolution the test might failed, would be possible mitigate it adding some validation in the screen resolution and/or adding Mobile tests.
   - There are some frameworks in the market that have a vast lib and could be very helpful to use one of them. However, I wasn't sure if WebdriverIo works well with Selenium Webdriver so I decided to not risk at this stage.


   
