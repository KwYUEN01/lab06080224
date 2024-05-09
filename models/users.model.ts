import * as db from "../helpers/database";

export const findByUsername  = async (username : any) => {
  const query = "SELECT * FROM users WHERE username = ?;";
  const user = await db.run_query(query, [username]);
  return user;
}

export const login = async (username: string, password: string): Promise<any> => {
  const query = "SELECT * FROM users WHERE username = ? AND password = ?;";
  const values = [username, password];
  const data = await db.run_query(query, values);
  if (data.length > 0) {
    return { status: 200, message: "Login successful" };
  } else {
    return { status: 401, message: "Invalid username or password" };
  }
}

export const register = async (username: string, password: string): Promise<any> => {
  const checkQuery = "SELECT * FROM users WHERE username = ?;";
  const checkValues = [username];
  const checkData = await db.run_query(checkQuery, checkValues);

  if (checkData.length > 0) {
    return { status: 409, message: "Username already exists" };
  } else {
    const insertQuery = "INSERT INTO users (username, password) VALUES (?, ?);";
    const insertValues = [username, password];

    try {
      await db.run_query(insertQuery, insertValues);
      return { status: 201, message: "Registration successful" };
    } catch (error) {
      return { status: 500, message: "Registration failed" };
    }
  }
}


// export const findByUsername = async (credentials: any) => {
//   const { username, password } = credentials;
//   const query = `SELECT * FROM users WHERE username = ? AND password = ?;`;
//   const values = [username, password];

//   try {
//     const result = await db.run_query(query, values);
//     if (result.length > 0) {
//       // 登入成功，返回使用者資訊或其他相關資料
//       return { status: 200, data: result[0] };
//     } else {
//       // 登入失敗，返回錯誤訊息
//       return { status: 401, error: "Invalid username or password" };
//     }
//   } catch (err) {
//     // 處理錯誤
//     return { status: 500, error: "Internal server error" };
//   }
// }
