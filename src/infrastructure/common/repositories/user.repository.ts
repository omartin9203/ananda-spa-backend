import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResourceRepository } from '../../core/repositories/resource.repository';
import { UserModel } from '../models/models/user.model';
import { STATUS, USER_MODEL_NAME } from '../../../constants';
import { QueryBuilderService } from '../../core/services/query-builder.service';
import * as bcrypt from 'bcryptjs';
import { Query } from 'mongoose';
import { Field } from 'type-graphql';
import { strict } from 'assert';
import { tryCatch } from 'rxjs/internal-compatibility';

@Injectable()
export class UserRepository extends ResourceRepository<UserModel> {
  constructor(
    @InjectModel(USER_MODEL_NAME) private readonly userModel: Model<UserModel>,
    private readonly querybuilderService: QueryBuilderService,

  ) {
    super(userModel, querybuilderService);
   }
  async signInSSO(email: string) {
    // const filter = this.querybuilderService.buildQueryEq(email, ['email']);
    return await this.userModel.findOne({ email }).select('id status roles').exec()
      .then(res => {
        if (!res)
          return null;
        return {
          id: res.id,
          status: res.status,
          roles: res.roles,
        };
      })
      .catch(err => {
        return null;
      });
  }
  async signUp(user) {
    const { password, email, userName } = user;
    const filter = new Query().or([{ email }, { userName }]).getQuery();
    return await this.userModel.findOne(filter).select('email').exec()
      .then(async res => {
        if (res) {
          return {
            success: false,
            message: `This ${res.email === email ? 'email' : 'userName'} is already being used`,
            data: null,
          };
        }
        const hash = await bcrypt.hash(password, 12);
        return await this.create({...user, password: hash})
          .then(userCreated => {
            if (!userCreated)
              return {
                success: false,
                message: `Error occurred during user creation`,
                data: null,
              };
            return {
              success: true,
              message: `Success`,
              data: {
                id: userCreated.id,
                status: userCreated.status,
                roles: userCreated.roles},
            };
          });
      })
      .catch(e => {
        return {
          success: false,
          message: `Error occurred during user creation`,
          data: null,
        };
      });

  }
  async signInLocal(unique, password) {
    const filter = new Query().or([{ email: unique }, { userName: unique }]).getQuery();
    try {
      const res = await this.userModel.findOne(filter).select('id status password roles').exec();
      // .then(res => {
      //   if (!res)
      //     return {
      //       success: false,
      //       message: `Invalid credentials`,
      //       data: null,
      //     };
      //   return bcrypt.compare(password, res.password)
      //     .then(doMatch => {
      //       if (doMatch) {
      //         const success = res.status === STATUS.ACTIVE;
      //         return {
      //           success,
      //           message: success ? `LogIn success` : `Status of this user is ${res.status}`,
      //           data: !success ? null : {
      //             id: res.id,
      //             status: res.status,
      //             roles: res.roles,
      //           },
      //         };
      //       }
      //       return {
      //         success: false,
      //         message: `Invalid credentials`,
      //         data: null,
      //       };
      //     })
      //     .catch(err => {
      //       return {
      //         success: false,
      //         message: `Error occurred during credentials verifications`,
      //         data: null,
      //       };
      //     });
      // })
      // .catch(err => {
      //   return {
      //     success: false,
      //     message: `Error occurred during credentials verifications`,
      //     data: null,
      //   };
      // });
      if (!res) {
        return {
          success: false,
          message: `Invalid credentials`,
          data: null,
        };
      }
      const doMatch = await bcrypt.compare(password, res.password);
      if (doMatch) {
        const success = res.status === STATUS.ACTIVE;
        return {
          success,
          message: success ? `LogIn success` : `Status of this user is ${res.status}`,
          data: !success ? null : {
            id: res.id,
            status: res.status,
            roles: res.roles,
          },
        };
      }
      return {
        success: false,
        message: `Invalid credentials`,
        data: null,
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
        data: null,
      };
    }
  }
  async getRolesOfUser(id: string) {
    return this.userModel.findById(id).select('roles').exec()
      .then(res => {
        if (!res) return [];
        return res.roles;
      });
  }
  async getUserInfo(id: string) {
    return await this.userModel.findById(id).select('id createdAt updatedAt email userName firstName lastName status imgSrc phone roles');
    // const roles: string[] = [];
    // user.roles.forEach(a => roles.push(a));
    // Mongoose
    // return {
    //   id: user.id,
    //   email: user.email,
    //   userName: user.userName,
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    //   status: user.status,
    //   imgSrc: user.imgSrc,
    //   phone: user.phone,
    //   roles,
    // };
  }
}
