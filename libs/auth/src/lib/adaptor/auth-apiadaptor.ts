import { Injectable } from '@angular/core';
import { AuthResponseDto, AuthUser } from '../interface/auth-response-dto';
import { Adaptor } from '../interface/adaptor';


@Injectable({
  providedIn: 'root',
})
export class AuthApiadaptor implements Adaptor<AuthResponseDto, AuthUser> {
  adapt(data: AuthResponseDto): AuthUser {
    return {
      message:data.message,
      id: data.user._id,
      fullName: data.user.firstName + ' ' + data.user.lastName,
      email: data.user.email,
      age: data.user.age,
      weight: data.user.weight,
      height: data.user.height,
      activityLevel: data.user.activityLevel,
      goal: data.user.goal,
      photo: data.user.photo,
      token: data.token,
    };
  }
  
}
