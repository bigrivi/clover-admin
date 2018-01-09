import { Pipe, PipeTransform } from '@angular/core';
import {TranslateService} from "../../@core/utils/translate.service"
import {PubSubService} from "../../@core/utils/pubsub.service"

@Pipe({ name: 'translate' })
export class TranslatePipe implements PipeTransform {

  constructor(public translateService:TranslateService,){

  }
  transform(key: string): string {
    return this.translateService.instant(key)
  }
}
