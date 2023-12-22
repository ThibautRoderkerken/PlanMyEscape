export interface ILoginDTO {
  email: string;
  password: string;
}

export interface IRegisterDTO {
  email: string;
  firstname: string,
  lastname: string,
  password: string;
}

export class LoginDTO implements ILoginDTO {
  email: string;
  password: string;
}

export class RegisterDTO implements IRegisterDTO {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}
