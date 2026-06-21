
export interface AuthResponseDto {
      message: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    photo: string;
    gender: string;
    age: number;
    weight: number;
    height: number;
    activityLevel: string;
    goal: string;
    createdAt: string;
  };
  token: string;
}
export interface AuthUser {
          message: string;
  id: string;
  fullName: string;
  email: string;
  photo: string;
  token: string;
      age: number;
    weight: number;
    height: number;
    activityLevel: string;
    goal: string;
}

export interface LoginRequest{
  email: string;
  password: string;
}
export interface RegisterRequest{
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    rePassword:string,
    gender:string,
    height:number,
    weight:number,
    age:number,
    goal:string,
    activityLevel:string

}
export interface ChangePasswordRequest {
    password: string;
    newPassword: string;
}
export interface ChangePasswordResponse {
    message: string;
    token: string;
}
export interface UploadProfilePhoto {
      photo: File; 
}
export interface UploadProfilePhotoResponse {
  message: string;      
  imageUrl?: string;    
}
export interface UploadProfileUserRequest {
      _id: string;
    firstName: string;
    lastName: string;
    email: string;
    photo: string;
    gender: string;
    age: number;
    weight: number;
    height: number;
    activityLevel: string;
    goal: string;
    createdAt: string;
    passwordChangedAt:string
  
}
export interface UploadProfileUserResponse {
message:string,
user:UploadProfileUserRequest
  
}
export interface logoutResponse {
message:string,

  
}
export interface ForgotResponse {
  message:string,
  info:string,
}




export interface ForgotRequest {
    email: string;
}  

export interface codeResponse {
  status:string
}

export interface codeRequest {
    resetCode: string;
}
 

export interface  RestPasswordResponse {
message:string,
token:string
}

export interface RestPasswordRequest {
    email:       string;
    newPassword: string;
}


