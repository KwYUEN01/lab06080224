import * as db from "../helpers/database";

export const getById = async (id: any) => {
  const query = "SELECT * FROM articles WHERE id = ?;"
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
}

export const getAll = async () => {
  const query = "SELECT * FROM articles;";
  const data = await db.run_query(query, null);
  return data;
}

export const add = async (articles: any) => {
  const keys = Object.keys(articles);
  const values = Object.values(articles);
  const key = keys.join(',');
  let parm = '';
  for (let i: number = 0; i < values.length; i++) { parm += '?,'}
  parm = parm.slice(0, -1);
  const query = `INSERT INTO articles (${key}) VALUES (${parm});`;
  try {
    await db.run_query(query, values);
    return {status: 201}
    
  }catch(err: any) {
    return err;
  }

}