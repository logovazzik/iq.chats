import chatsService from '../chats/services/chats';

class UserApi {
  getUser() {
    console.log('api/user', 'GET');
    // start section for mocking
    return Promise.resolve(chatsService.getMockCurrentUser());
    // end section for mocking
  }
}

const api = new UserApi();
export default api;