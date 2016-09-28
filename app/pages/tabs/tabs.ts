import { Component } from '@angular/core';
import { LoginPage } from '../login/login';
import { ContactsPage } from '../contacts/contacts';
import { RegisterPage } from '../register/register';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  public tab1Root: any;
  public tab2Root: any;
  public tab3Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = LoginPage;
    this.tab2Root = ContactsPage;
    this.tab3Root = RegisterPage;
  }
}
