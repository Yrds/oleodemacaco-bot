import {Sequelize} from 'sequelize';

const getDatabaseURL = (env: string) => {
  if(env === 'production'){
    return process.env.DATABASE_URL as string;
  }
  return "postgres://user:pass@localhost:5432/database";
}

function getDatabase(): any {
  const databaseURL = getDatabaseURL(process.env.NODE_ENV as string)
  try{
    return new Sequelize(databaseURL);
  } catch (err) {
    console.error('database ', err.message);
  }
}

export default getDatabase();
