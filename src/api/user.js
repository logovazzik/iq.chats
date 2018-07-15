import userMockService from '../services/users.mocks';

class UserApi {
    async getUser() {
        console.log('api/user', 'GET');
        return await (userMockService.getMockCurrentUser());
    }
}

const api = new UserApi();
export default api;