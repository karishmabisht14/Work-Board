export class ApiEndPoints {
    static login = 'Clients/login?include=user';
    static signUp = 'Clients';
    static categories = 'Categories?filter[include]=subCategories';
    static sendResetEmail = 'Clients/reset';
    static logout = 'Clients/logout';
    static searchJobs = 'Clients/search-jobs';
    static getMyJobs =
      'jobs?filter[include]=priceType&filter[include]=availablityType&filter[include]=scheduledDays';
    static resetPassword = 'Clients/reset-password';
    static uploadPathRoot = 'Containers/';
    static updateUserSettings = 'clientSettings';
    static getDates = 'getSummay';
    static changePassword = 'change-password';
  }