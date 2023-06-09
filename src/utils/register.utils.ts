type RegisterValidationsProps = {
  fullName: string;
  avatar?: File;
  email: string;
  password: string;
  retypePassword: string;
}

const MAX_FILE_SIZE = 3500000;

export const getMsgOnValidateError = ({ fullName, avatar, email, password, retypePassword }: RegisterValidationsProps): String => {
  if (fullName.trim().length < 3) return 'Nome deve ter pelo menos 4 caracteres!';
  if (!avatar) return 'Necessário um avatar';
  if (avatar.size > MAX_FILE_SIZE) return 'Foto deve ter até 3.5MB'
  if (!email.trim()) return 'Email deve ser preenchido com algo!';
  if (!password.trim()) return 'Favor informar a senha...';
  if (password !== retypePassword) return 'Senhas não são idênticas!';
  return '';
}
