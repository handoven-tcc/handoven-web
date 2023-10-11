export class UserRequest {
  constructor(
    public name: string,
    public birthDate: string,
    public email: string,
    public cell: string,
    public familyName: string,
    public password: string,
    public familyId?: string
  ) {}
}
