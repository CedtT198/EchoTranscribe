export const SERVER_URL="http://localhost:8080";

export interface ValidationErrors {
  [key: string]: string;
}

export interface FormDataUpdateUser {
    name: string,
    first_name: string,
    old_password: string,
    new_password: string,
    confirm_new_password: string
}

export interface FormDataUser {
    name: string,
    first_name: string,
    country: string,
    city: string,
    zip: string,
    address: string,
    mail: string,
    birthday: string,
    password: string,
    confirm_password: string
}
