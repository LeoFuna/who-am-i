import db from './../../../prisma/db';

export default async function accountDetailsService({ id }: { id: string }) {
  const user = await db.user.findUnique({ where: { id }, include: { avatar: true } });
  if (!user) throw new Error('Dados inválidos!');

  return user;
}