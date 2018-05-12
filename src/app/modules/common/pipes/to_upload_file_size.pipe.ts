import { Pipe, PipeTransform } from '@angular/core';
import {environment} from "../../../../environments/environment"

@Pipe({ name: 'to_upload_file_size' })
export class toUploadFileSizePipe implements PipeTransform {

  transform(byte: any) {
    var kb = byte/1024;
    var mb;
    if(kb > 1024) {
        mb = kb/1024;
    }

    var result = mb ? mb : kb;
    var fix = mb ? 'MB' : 'KB';

    return parseFloat(result).toFixed(3) + fix;
  }
}
