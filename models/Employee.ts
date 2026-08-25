export interface Employee {
  firstName: string;
  lastName: string;
  middleName: string;
  employeeId: string;
}

export interface EmployeeDetails {
  nationality: string;
  maritalStatus: string;
  gender: "Male" | "Female";
  dateOfBirth: string;
  photo?: string;
}

export interface CreateEmployeeAPIRequest {
  firstName: string;
  middleName?: string;
  lastName: string;
  employeeId: string;
  empPicture?: null;
}

export interface GetEmployeesResponse {
  data: Employee[];
  meta: {
    total: number;
  };
  rels: unknown[];
}
