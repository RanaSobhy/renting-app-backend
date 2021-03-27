const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.verifyToken = (req, res, next) => {
  async function verify() {
    let token = req.headers["x-access-token"];
    if (!token) {
      res.status(401).send({ message: "Unauthorized!" });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userDetails = {
      email: payload["email"],
      firstname: payload["given_name"],
      lastname: payload["family_name"],
    };
    next();
  }
  verify().catch((err) => {
    res.status(401).send({ message: "Unauthorized!" });
  });
};
