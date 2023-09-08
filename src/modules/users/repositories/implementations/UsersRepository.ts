import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
    });

    this.users.push(user);
    console.log(user);
    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  findByEmail(email: string): User | undefined {
    // Complete aqui
  }

  turnAdmin(receivedUser: User): User {
    const userIndex = this.users.findIndex(
      (user) => user.id === receivedUser.id
    );

    const updatedUser = {
      id: receivedUser.id,
      name: receivedUser.name,
      email: receivedUser.email,
      admin: true,
      created_at: receivedUser.created_at,
    };

    this.users.splice(userIndex, 1, updatedUser);

    return updatedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
