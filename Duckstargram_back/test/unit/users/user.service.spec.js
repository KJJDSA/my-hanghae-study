const Users = require('../../../services/users');

const {
  createUserInsert,
  createUserResult,
  userLoginInsert,
  userLoginResult,
} = require('../../fixtures/users.fixtures.js');

const mockUserRepository = {
  userLogin: jest.fn(),
  findUser: jest.fn(),
  createUser: jest.fn(),
};

test('hehe', () => {
  expect(1 + 1).toBe(2);
});

describe("Users unit test", () => {


  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("createUser 테스트", async () => {
    const usersService = new Users();
    usersService.userRepository = Object.assign(
      {}, //이건뭐지?
      mockUserRepository
    );
    usersService.userRepository.createUser = jest.fn(
      () => createUserResult
    );
    usersService.userRepository.findUser = jest.fn()

    const result = await usersService.createUser(createUserInsert);

    expect(usersService.userRepository.findUser).toHaveBeenCalledTimes(1);
    expect(usersService.userRepository.createUser).toHaveBeenCalledTimes(1);
    expect(usersService.userRepository.createUser).toHaveBeenCalledWith(createUserInsert);
    expect(result).toMatchObject(createUserResult);
  })

  test("uerLogin 테스트", async () => {
    const usersService = new Users();
    usersService.userRepository = Object.assign(
      {}, //이건뭐지?
      mockUserRepositor);
    usersService.userRepository.userLogin = jest.fn()

    const result = await usersService.userLogin(userLoginInsert);

    expect(usersService.userRepository.userLogin).toHaveBeenCalledTimes(1);
    expect(usersService.userRepository.userLogin).toHaveBeenCalledWith(userLoginInsert);
    expect(result).toMatchObject(userLoginResult);
  });

});