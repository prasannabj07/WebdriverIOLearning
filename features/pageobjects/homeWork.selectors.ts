class homeWorkSelector {
    get twitterProfileName() {
        return $("//div[@class='css-175oi2r r-3pj75a r-ttdzmv r-1ifxtd0']//span[text() = 'OrangeHRM']")
    }

    get twitterLink() {
        return $('//div[@class="orangehrm-login-footer-sm"]//a[3]')
    }

    get faceBookLink() {
        return $('//div[@class="orangehrm-login-footer-sm"]//a[2]')
    }
}

export default new homeWorkSelector();