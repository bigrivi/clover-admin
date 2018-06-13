
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { hmrBootstrap } from './hmr';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
 //if (environment.production) {
  enableProdMode();
//}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.info(err));



  const bootstrap = () => {
    return platformBrowserDynamic().bootstrapModule(AppModule);
  }

  if (environment.hmr) {
    if (module['hot']) {
        console.log("hrm started")
      hmrBootstrap(module, bootstrap);
    } else {
      // 未加上 --hmr 时，控制台会有错误提醒
      console.error('HMR没有启用，确保 ng server 命令加上 --hmr 标记');
    }
  } else {
    bootstrap();
  }
