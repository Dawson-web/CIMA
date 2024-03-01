export interface registerForm {
  hobbies?: null | string;
  password?: null | string;
  realName?: null | string;
  username?: null | string;
  age?: null | bigint;
  grade?: null | string;
}
export interface loginForm {
  password: string;
  username: string;
}

export interface Competition {
  competitionDesc?: null | string;
  competitionGroup?: null | string;
  competitionName?: null | string;
  competitionOrganizer?: null | string;
  competitionType?: null | string;
  competitionWeb?: null | string;
  id?: number | null;
}
