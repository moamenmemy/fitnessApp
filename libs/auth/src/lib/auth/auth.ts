import { map, Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { AuthResponseDto, AuthUser, ChangePasswordRequest, ChangePasswordResponse, codeRequest, codeResponse, ForgotRequest, ForgotResponse, LoginRequest, logoutResponse, RegisterRequest, RestPasswordRequest, RestPasswordResponse, UploadProfilePhoto, UploadProfilePhotoResponse, UploadProfileUserRequest, UploadProfileUserResponse } from '../interface/auth-response-dto';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../interface/Base_url';
import { AuthApi } from '../base/aurthApi';
import { AuthEndPoint } from '../enums/AuthEndPoint';
import { AuthApiadaptor } from '../adaptor/auth-apiadaptor';
@Injectable({
  providedIn: 'root',
})
export class Auth implements AuthApi {
  _httpclient=inject(HttpClient)
  _authApiadaptor=inject(AuthApiadaptor)
   _bASEURL=inject(BASE_URL)
Login(data:LoginRequest): Observable<AuthUser> {
return this._httpclient.post<AuthResponseDto>(this._bASEURL+AuthEndPoint.Login, data).pipe(
  map(data=>this._authApiadaptor.adapt(data))
)
  };
SignUp(data:RegisterRequest): Observable<AuthUser> {
return this._httpclient.post<AuthResponseDto>(this._bASEURL+AuthEndPoint.SiginUp, data).pipe(
  map(data=>this._authApiadaptor.adapt(data))
)
  };
    changePassword(data: ChangePasswordRequest): Observable<ChangePasswordResponse> {
    return this._httpclient.post<ChangePasswordResponse>(
      this._bASEURL + AuthEndPoint.changePassword,
      data
    );
  };
    uploadProfilePhoto(data: UploadProfilePhoto): Observable<UploadProfilePhotoResponse> {

    return this._httpclient.post<UploadProfilePhotoResponse>(
      this._bASEURL + AuthEndPoint.uploadProfilePhoto,
      data
    );
  };
    GetloggedUserData(): Observable<UploadProfileUserResponse> {
    return this._httpclient.get<UploadProfileUserResponse>(
      this._bASEURL + AuthEndPoint.GetloggedUserData
    );
  };
    logout(): Observable<logoutResponse> {
    return this._httpclient.get<logoutResponse>(
      this._bASEURL + AuthEndPoint.logout
    );
  };
    forgotPassword(data: ForgotRequest): Observable<ForgotResponse> {
    return this._httpclient.post<ForgotResponse>(
      this._bASEURL + AuthEndPoint.forgotPassword,
      data
    );
  };
    VerifyReset(data: codeRequest): Observable<codeResponse> {
    return this._httpclient.post<codeResponse>(
      this._bASEURL + AuthEndPoint.VerifyReset,
      data
    );
  };
    ResetPassword(data: RestPasswordRequest): Observable<RestPasswordResponse> {
    return this._httpclient.put<RestPasswordResponse>(
      this._bASEURL + AuthEndPoint.ResetPassword,
      data
    );
  };
    deleteMyAccount(): Observable<logoutResponse> {
    return this._httpclient.delete<logoutResponse>(
      this._bASEURL + AuthEndPoint.deleteMyAccount
    );
  };
    editProfile(data: UploadProfileUserRequest): Observable<UploadProfileUserResponse> {
    return this._httpclient.put<UploadProfileUserResponse>(
      this._bASEURL + AuthEndPoint.editProfile,
      data
    );
  }
}

