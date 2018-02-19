const assert = require('chai').assert;
const app = require('../app');
const {Builder, By, Key, until} = require('../node_modules/selenium-webdriver');

var driver = new Builder().forBrowser('chrome').build();
var timeWait = 50000;
describe('App', function() {
  this.timeout(timeWait);
  beforeEach(function teste(done) {

    driver.get('http://demo.redmine.org').then(done);
    driver.findElement(By.linkText('Cadastre-se')).click();
  });

  afterEach(function() {
    if (this.currentTest.state === 'failed') {
      driver.quit();
    }
  });

  it('Cadastro de usuário', function(done) {
    driver.get('http://demo.redmine.org/account/register').then(done);
    driver.findElement(By.id('user_login')).sendKeys('santosfael');
    driver.findElement(By.id('user_password')).sendKeys('10rocha20');
    driver.findElement(By.id('user_password_confirmation')).sendKeys('10rocha20');
    driver.findElement(By.id('user_firstname')).sendKeys('Rafael');
    driver.findElement(By.id('user_lastname')).sendKeys('Rocha dos Santos');
    driver.findElement(By.id('user_mail')).sendKeys('test@gmail.com');
    //var button = driver.findElement(By.name('commit')).click();
    var userLogin = driver.findElement(By.id('user_login')).getText();
    var userPassword = driver.findElement(By.id('user_password')).getText().toString();
    var userPasswordConfir =  driver.findElement(By.id('user_password_confirmation')).getText().toString();
    var userFisrtName = driver.findElement(By.id('user_firstname')).getText().toString();
    var userLastName = driver.findElement(By.id('user_lastname')).getText().toString();
    var userEmail = driver.findElement(By.id('user_mail')).getText().toString();
    var teste;
     userLogin.then(function(text) {
       teste = text;
     })
    driver.wait(function(){

      assert.equal(app.cadastroCliente(), userLogin+','+userPassword+','+userPasswordConfir+
    ','+userFisrtName+','+userLastName+','+userEmail, 'passed');
    console.log('Teste'+userLogin);
    },10000);

  });
  //it('teste', function () {

  //});
});
