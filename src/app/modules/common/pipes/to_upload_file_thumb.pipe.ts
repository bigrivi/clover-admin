import { Pipe, PipeTransform } from '@angular/core';
import {environment} from "../../../../environments/environment"

@Pipe({ name: 'to_upload_file_thumb' })
export class toUploadFileThumbPipe implements PipeTransform {

  transform(input: any) {
  	var mimes = ['image/jpeg', 'image/png', 'image/gif'];
    if(mimes.indexOf(input.filetype)>=0){
    	var src = "";
    	if(input.id){
    		src = environment.API_ROOT+"uploader/attachments/preview?id="+input.id;
    	}else if(input.base64){
    		src = "data:"+input.filetype+";base64,"+input.base64;
    	}
    	return `<img src="${src}" /><br><a target="_blank" href="${src}">查看</a>`
    }
    else{
    	if(input.id){
    		var src = environment.API_ROOT+"uploader/attachments/preview?id="+input.id;
    		return `<a  href="${src}">下载</a>`
    	}
    }
  }
}
