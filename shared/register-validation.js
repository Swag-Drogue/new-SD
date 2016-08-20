function isEmpty(userData) {
  return (userData.userName === '') || (userData.password === '');
}

function validUserName(userName) {
  const userNameSyntax = /^[A-Za-z0-9]{6,20}$/;
  return userNameSyntax.test(userName);
}

function validPassword(password) {
  const passwordSyntax = /^\d{6}$/;
  return passwordSyntax.test(password);
}

export {isEmpty, validUserName, validPassword};
