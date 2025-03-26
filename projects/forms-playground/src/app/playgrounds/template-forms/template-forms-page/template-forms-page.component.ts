import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserInfo } from '../../../core/user-info';
import { BanWordsDirective } from '../validators/ban-words.directive';
import { PasswordShouldMatchDirective } from '../validators/password-should-match.directive';

@Component({
  selector: 'app-template-forms-page',
  standalone: true,
  imports: [CommonModule, FormsModule, BanWordsDirective, PasswordShouldMatchDirective],
  templateUrl: './template-forms-page.component.html',
  styleUrls: [
    '../../common-page.scss',
    '../../common-form.scss',
    './template-forms-page.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateFormsPageComponent implements OnInit {

  userInfo: UserInfo = {
    firstName: 'Dmytro',
    lastName: '',
    nickname: '',
    email: '',
    yearOfBirth: 2022,
    passport: '',
    fullAdress: '',
    city: '',
    postCode: 0,
    password: '',
    confirmPassword: ''
  }

  get isAdult() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.userInfo.yearOfBirth >= 18;
  }

  get years() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40)).fill('').map((_, idx) => now - idx);
  }

  ngOnInit(): void {
  }

  onSubmitForm(form: NgForm, e: SubmitEvent) {
    console.log('The form has been submitted', form.value);
    this.userInfo = {
      firstName: '',
      lastName: '',
      nickname: '',
      email: '',
      yearOfBirth: 2022,
      passport: '',
      fullAdress: '',
      city: '',
      postCode: 0,
      password: '',
      confirmPassword: ''
    }
    // console.log('The native submit event', e);

  }

}
