import {User} from '../db/schema';

function isEmpty(userData) {
  let flag = true;
  if (userData.userName === '' || userData.password === '') {
    flag = false;
  }
  return flag;
}

function validSyntax(userData) {
  let flag = true;
  const userNameSyntax = /^[A-Za-z0-9]{6,20}$/;
  const passwordSyntax = /^\d{6}$/;

  flag = userNameSyntax.test(userData.userName) && passwordSyntax.test(userData.password);
  return flag;
}

// function userExist(userName) {
//   User.findOne({userName: userName}, function (err, user) {
//     if (err) throw err;
//     if(user===null){
//       console.log('xxx');
//       console.log(flag);
//       return flag;
//     }else if(user.userName === userName){
//       flag = false;
//       console.log(flag);
//       return flag;
//     }
//   });
// }

export {isEmpty, validSyntax};
