require('dotenv-flow').config();

const config = {
    loginUrl: process.env.LOGIN_URL as string,
    defaultCredentials: {
        email: process.env.DEFAULT_EMAIL as string,
        password: process.env.DEFAULT_PASSWORD as string
    },
    twoFactorSecurityQuestions: JSON.parse(process.env.MFA_QUESTIONS as string),
    bankAccountsUrl: process.env.BANKACCOUNTS_URL as string,
    dashboardUrl: process.env.DASHBOARD_URL as string,
};

export default config;
