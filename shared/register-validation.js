function isEmpty(userData) {
  return (userData.userName === '') || (userData.password === '')
}

function validUserName(userData) {
  const userNameSyntax = /^[A-Za-z0-9]{6,20}$/;
  return userNameSyntax.test(userData.userName);
}

function validPassword(userData) {
  const passwordSyntax = /^\d{6}$/;
  return passwordSyntax.test(userData.password);
}

export {isEmpty, validUserName, validPassword};
