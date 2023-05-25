const mongoose = require("mongoose");
// Object ID updates on upsert, so had to change back to manuial aproac. IN future, use version keys, they look like a good solution.

const UsersSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, "must provide an address"],
    trim: true,
    minLength: 3,
  },
  profilePicture: {
    type: String,
  },
  //   email: {
  //     type: String,
  //     required: [true, "must provide an email"],
  //     trim: true,
  //     minLength: 3,
  //     maxLength: 50,
  //     match: [
  //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  //       "Please provide valid email address",
  //     ],
  //     unique: true,
  //   },
});

const Users = mongoose.models?.Users || mongoose.model("Users", UsersSchema);

export default Users;
