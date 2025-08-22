export class LoginControls {
    get inputUsername() {
        return $('#userEmail');
    }

    get inputPassword() {
        return $('#userPassword');
    }

    get btnSubmit() {
        return $('#login');
    }

    get invalidErrorPopUp() {
        return $("//div[@aria-label='Incorrect email or password.']");
    }

    get cart(){
        return $("//div[@class='card-body']//b[text()='ZARA COAT 3']")
    }

    get alertPopup() {
        return $$("//button[text()='Click me']")[0]; // or use text-based selector
    }

    get dropDown() {
        return $$("//div[@class='col-md-6']")[0];
    }
}