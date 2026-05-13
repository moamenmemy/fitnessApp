import { Observable } from "rxjs";
import {  AuthUser, ChangePasswordRequest, ChangePasswordResponse, codeRequest, codeResponse, ForgotRequest, ForgotResponse, LoginRequest, logoutResponse, RegisterRequest, RestPasswordRequest, RestPasswordResponse, UploadProfilePhoto, UploadProfilePhotoResponse, UploadProfileUserRequest, UploadProfileUserResponse } from "../interface/auth-response-dto";

export abstract class AuthApi {
    abstract Login(data: LoginRequest): Observable<AuthUser>;
    abstract SignUp(data: RegisterRequest): Observable<AuthUser>;
    abstract changePassword(data: ChangePasswordRequest): Observable<ChangePasswordResponse>;
    abstract uploadProfilePhoto(data: UploadProfilePhoto): Observable<UploadProfilePhotoResponse>;
    abstract GetloggedUserData(): Observable<UploadProfileUserResponse>;
    abstract logout(): Observable<logoutResponse>;
    abstract forgotPassword(data: ForgotRequest): Observable<ForgotResponse>;
    abstract VerifyReset(data: codeRequest): Observable<codeResponse>;
    abstract ResetPassword(data: RestPasswordRequest): Observable<RestPasswordResponse>;
    abstract deleteMyAccount(): Observable<logoutResponse>;
    abstract editProfile(data: UploadProfileUserRequest): Observable<UploadProfileUserResponse>;

}