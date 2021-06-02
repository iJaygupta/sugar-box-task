/*
  Error and Success Response Messages and Code
*/


// Server Resource Error

exports[4000] = {
    code: 4000,
    message: "Internal Server Error."
};

exports[4001] = {
    code: 4001,
    message: "Something went wrong."
};

exports[4002] = {
    code: 4002,
    message: "Data not found."
};


// Auth Response 

exports[1000] = {
    code: 1000,
    message: "Hey, looks like you haven't not register. please register."
};
exports[1001] = {
    code: 1001,
    message: "Invalid Credentials"
};
exports[1002] = {
    code: 1002,
    message: "Successfully Logged In."
};

// User Response 

exports[2000] = {
    code: 2000,
    message: "User List Get Successfully."
};
exports[2001] = {
    code: 2001,
    message: "User Successfully Registered."
};
exports[2002] = {
    code: 2002,
    message: "User Updated Successfully."
};
exports[2003] = {
    code: 2003,
    message: "User Deleted Successfully."
};
exports[2004] = {
    code: 2004,
    message: "User Data Get Successfully."
};
