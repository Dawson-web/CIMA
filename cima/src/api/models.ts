export interface registerForm {
  hobbies: string;
  password: string;
  realName: string;
  username: string;
  age: bigint;
  grade: string;
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
