const jwt=require("jsonwebtoken")
const secret="123"
function setUser(user)
{
    console.log(user);
  const payload={
    _id:user._id,
    email:user.email
  }
  return jwt.sign(payload,secret)
}
function getUser(token)
{
    if(!token) return null;
    return jwt.verify(token,secret);
}
module.exports={setUser,getUser};
//ciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODJjNDZkMzQ4MTgwMzVkNTUxN2JkNjciLCJlbWFpbCI6IjJAZ21haWwuY29tIiwiaWF0IjoxNzQ3OTI2OTU0fQ.0xkmWWqXmQL26b-juwiybxqt61RDw77FpMHG8ZZ1I6o
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODJjNDZkMzQ4MTgwMzVkNTUxN2JkNjciLCJlbWFpbCI6IjJAZ21haWwuY29tIiwiaWF0IjoxNzQ3OTI4OTExfQ.SDrpCKWb70_HDJyaHJkgyyCkQsmz6nPybWvKy7iCTYw