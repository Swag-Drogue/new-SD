function isEmpty(userData) {
  let flag = false;
  if (userData.userName === '' || userData.password === '') {
    flag = true;
  }
  return flag;
}

function validSyntax(userData) {
  const userNameSyntax = /^[A-Za-z0-9]{6,20}$/;
  const passwordSyntax = /^\d{6}$/;
  return userNameSyntax.test(userData.userName) && passwordSyntax.test(userData.password);

}

export {isEmpty, validSyntax};
