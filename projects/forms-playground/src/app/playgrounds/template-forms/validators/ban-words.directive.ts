import { afterRenderEffect, Directive, input, untracked } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appBanWords]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: BanWordsDirective,
      multi: true
    }
  ]
})
export class BanWordsDirective implements Validator {

  appBanWords = input<string[], string | string[]>([], {
    transform: (value) => Array.isArray(value) ? value : [value],
  });

  private onChange: () => void = () => {}
  
  constructor() {
    afterRenderEffect(() => {
      this.appBanWords(); 
      // calling onChange() when appBanWords changes
      untracked(() => this.onChange());
    });
  }

  validate(control: AbstractControl<string>): ValidationErrors | null {
    const foundBannedWord = this.appBanWords().find(word => word.toLowerCase() === control.value?.toLowerCase());
    return !foundBannedWord
      ? null
      : { appBanWords: { bannedWord: foundBannedWord } }
  }

  registerOnValidatorChange(fn: () => void) {
    this.onChange = fn;
  }

}
