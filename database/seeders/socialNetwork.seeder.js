const socialNetworkSeeder = async (db) => {
  let sql = "";
  sql = "INSERT INTO pvSocialNetwork (sn_name) VALUES ";
  sql += '("WhatsApp"), ("Instagram")';
  await db.execute(sql, (error) => {
    if (error) console.log("Error in socialNetwork.seeder: " + error);
    else console.log("socialNetwork.seeder succesfull execution");
  });
};

module.exports = socialNetworkSeeder;
