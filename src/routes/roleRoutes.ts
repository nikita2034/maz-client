interface Route {
    path: string;
    label: string;
  }
  
  export const roleRoutes: { [key: string]: Route[] } = {
    ROLE_SUPERADMIN: [
      { path: '/super-admin/main', label: 'Главная' },
      { path: '/super-admin/transports', label: 'Транспорт' },
      { path: '/super-admin/organizations', label: 'Организации' },
      { path: '/super-admin/archive', label: 'Архив' },
      { path: '/super-admin/reports', label: 'Отчеты' },
    ],
    ROLE_ADMIN: [
      { path: '/admin/main', label: 'Главная' },
      { path: '/admin/transports', label: 'Транспорт' },
      { path: '/admin/reports', label: 'Отчеты' },
    ],
    ROLE_OPERATOR: [
      { path: '/operator/dashboard', label: 'Главная' },
      { path: '/operator/transports', label: 'Транспорт' },
    ],
    ROLE_DIRECTOR: [
        { path: '/director/dashboard', label: 'Главная' },
        { path: '/director/transports', label: 'Транспорт' },
    ],
    ROLE_MANAGER: [
        { path: '/manager/dashboard', label: 'Главная' },
        { path: '/manager/transports', label: 'Транспорт' },
    ],
    ROLE_MANUFACTURER: [
        { path: '/manufacturer/dashboard', label: 'Главная' },
        { path: '/manufacturer/transports', label: 'Транспорт' },
    ],
  };
  