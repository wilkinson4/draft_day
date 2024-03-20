import postgres from 'postgres';

const psql = postgres('postgres://postgres:postgres@localhost:5432');

const resetDatabase = async () => {
  await psql`drop database if exists draft_day;`;
  console.log('Database dropped');
  await psql`create database draft_day;`;
  console.log('Database created');
};

await resetDatabase();

process.exit();
