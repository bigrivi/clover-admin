import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: '产品管理系统',
    icon: 'nb-keypad',
    link: '',
    children: [
      {
        title: '产品管理',
        link: '/apps/product/product',
      },
      {
        title: '分类管理',
        link: '/apps/product/category',
      },
      {
        title: '标签管理',
        link: '/apps/product/tag',
      }
    ],
  },
  {
    title: '账户管理系统',
    icon: 'nb-gear',
    link: '',
    children: [
      {
        title: '用户信息',
        link: '/apps/account/userInfo',
      },
       {
        title: '部门信息',
        link: '/apps/account/department',
      }
    ],
  }

];
