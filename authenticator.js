
class Authenticator {

  page;
  usernameFieldSelector;
  passwordFieldSelector;
  loginButtonSelector;
  username;
  password;

  constructor (
    page,
    usernameFieldSelector,
    passwordFieldSelector,
    loginButtonSelector,
    username,
    password,
  ) {
    this.page = page;
    this.usernameFieldSelector = usernameFieldSelector;
    this.passwordFieldSelector = passwordFieldSelector;
    this.loginButtonSelector = loginButtonSelector;
    this.username = username;
    this.password = password;
  }

  async login () {
    await this.page.type(this.usernameFieldSelector, this.username);
    await this.page.type(this.passwordFieldSelector, this.password);
    await this.page.click(this.loginButtonSelector);
  }
  
}

module.exports = Authenticator;
