import userMockService from '../services/users.mocks';

class UserApi {
  getUser() {
    console.log('api/user', 'GET');
    // start section for mocking
    return Promise.resolve(userMockService.getMockCurrentUser());
    // end section for mocking
  }
}

const api = new UserApi();
export default api;