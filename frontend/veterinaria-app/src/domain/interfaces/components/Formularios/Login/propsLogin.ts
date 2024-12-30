import { LoginModel } from "@/domain/models/login/login";

export interface propsLogin {
    onSubmit: (data: LoginModel) => void;
}