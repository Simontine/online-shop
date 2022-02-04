const pool = require("../config");

const getAllUsersDb = async () => {
  const { rows: users } = await pool.query("select * from users");
  return users;
};

const createUserDb = async ({ name, password, email, lastname , cellno}) => {

  const usr= await pool.query(
    `INSERT INTO users(name, password, email, lastname, cellno)
     VALUES($1, $2, $3, $4, $5) 
     returning user_id, name, email, lastname, cellno, roles, created_at`,
 [name, password, email, lastname, cellno]);
  const myuser=usr.rows[0];
 return myuser;

};

const createUserAddressDb = async ({province, surburb, street, city,user_id})=>{

  const adr= await pool.query(
    `INSERT INTO addresses(province, surburb, street, city, user_id)
     VALUES($1, $2, $3, $4, $5) 
     returning address_id,province, surburb, street, city, created_at`,
   [province, surburb, street, city,user_id]);
    
   const address=adr.rows[0];

   return address;
};

const getUserByIdDb = async (id) => {
  const { rows: user } = await pool.query(
    "select users.* from users where users.user_id = $1",
    [id]
  );//0581
  return user[0];
};

const getUserByEmailDb = async (email) => {
 
  const exists =await pool.query(
    "select users.* from users where lower(email) = lower($1) ",
    [email]
  );

  return exists.rows[0]? exists.rows[0]: false;
  
  //return user[0];
};

const updateUserAddressDb = async ({
  id,
  street,
  surburb,
  city,
  province,
  user_id
})=>{
  const { rows: adr } = await pool.query(
    `UPDATE addresses set street = $1, surburb = $2, city = $3 , province= $4
      where id = $5 AND user_id = $6 returning street, surburb, city, province`,
    [street,surburb, city, province,id,user_id]
  );
  const address= adr[0];
  return address;
};

const updateUserDb = async ({
  name,
  email,
  lastname,
  id,cellno
}) => {
  const { rows: user } = await pool.query(
    `UPDATE users set name = $1, email = $2, lastname = $3 , cellno= $4
      where user_id = $5 returning name, email, lastname, user_id`,
    [name, email, lastname, cellno, id]
  );
  const myuser=user[0];
  return myuser;

};

const deleteUserDb = async (id) => {
  const { rows: user } = await pool.query(
    "DELETE FROM users where user_id = $1 returning *",
    [id]
  );
  return user[0];
};

const changeUserPasswordDb = async (hashedPassword, email) => {
  return await pool.query("update users set password = $1 where email = $2", [
    hashedPassword,
    email,
  ]);
};

module.exports = {
  getAllUsersDb,
  getUserByIdDb,
  getUserByEmailDb,
  updateUserDb,
  createUserDb,
  deleteUserDb,
  changeUserPasswordDb,
  createUserAddressDb,
  updateUserAddressDb
};
