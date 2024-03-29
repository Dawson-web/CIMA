export interface registerForm {
  hobbies: string;
  password: string;
  realName: string;
  username: string;
  age: bigint;
  grade: string;
  school: string;
  province: string;
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
export interface updateForm {
  newHobbies: string;
  newUsername: string;
}

export interface passwordForm {
  confirm: string;
  password: string;
}

export interface competitionRegisterForm {
  schoolName: string;
  competitionName: string;
  competitionType: string;
  province: string;
}
