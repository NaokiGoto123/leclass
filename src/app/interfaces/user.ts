export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName: string;
  profile: string;
  isTeacher: boolean;
  isAdministrator: boolean;
  isDeveloper: boolean;
}
