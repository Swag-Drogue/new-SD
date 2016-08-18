function isEmpty(userData) {
  return (userData.userName === '') || (userData.password === '')
}
function checkUserName() {
  let userName = document.getElementById('userName');
  const userNameSyntax = /^[A-Za-z0-9]{6,20}$/;
  return userNameSyntax.test(userName.userName);
}
function checkPassword(userData) {
  let password = document.getElementById('password');
  const passwordSyntax = /^\d{6}$/;
  return passwordSyntax.test(userData.password);
}
module.exports = {isEmpty, checkPassword, checkUserName};
