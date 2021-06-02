const bcrypt = require('bcryptjs');
const sendResponse = require("../utils/apiResponse").sendResponse;
const { User } = require("../models/users");
const { generateAuthToken } = require("../lib/auth");



/**
 * Register A User.
 *
 * @param {String} name
 * @param {Object} email
 * @param {Object} password
 * @param {Object} addressLine
 * @param {Object} city
 * @param {Object} state
 * @param {Object} zipCode
 * @param {Object} phoneNo
 * 
 * @returns {Object}
 */

exports.registerUser = async (request, response) => {
    try {
        let data = { ...request.body };
        data.password = bcrypt.hashSync(data.password);
        let user = new User(data);
        user = await user.save();
        sendResponse(response, false, 201, 2001, user);
    } catch (error) {
        sendResponse(response, true, 500, 4001, error);
    }
};


/**
 * Register A User.
 *
 * @param {Object} email
 * @param {Object} password
 * 
 * @returns {Object}
 */

exports.logIn = async (request, response) => {
    try {
        let userDetail = await User.findOne({ email: request.body.email });
        if (!userDetail) {
            return sendResponse(response, false, 200, 1000);
        }
        let isPasswordMatched = await bcrypt.compare(request.body.password, userDetail.password);
        if (!isPasswordMatched) {
            return sendResponse(response, false, 200, 1001);
        }
        delete userDetail.password;
        let payload = {
            id: userDetail._id,
            name: userDetail.name,
            email: userDetail.email
        }
        let token = await generateAuthToken(payload);
        let result = {
            token,
            user: userDetail
        }
        sendResponse(response, false, 200, 1002, result);
    } catch (error) {
        sendResponse(response, true, 500, 4001, error);
    }
};

/**
 * Get List of Users.
 *
 * @param {string}  page
 * @param {string}  pagination
 * @param {string}  searchKeyword 
 * @param {string}  limit
 * @param {string}  skip
 *
 * @returns {Object}
 */


exports.listUsers = (request, response) => {

    let page = parseInt(request.query.page) || 1;
    let limit, skip;
    let resPerPage = parseInt(request.query.resPerPage) || 5;
    let sort = {};

    if (request.query.sortBy && request.query.orderBy) {
        sort[request.query.sortBy] = request.query.orderBy === 'desc' ? -1 : 1
    }

    if (!(request.query.pagination && request.query.page)) {
        sortBy = request.query.sortBy;
        orderBy = request.query.orderBy;
        limit = parseInt(request.query.limit) || resPerPage;
        skip = parseInt(request.query.skip) || 0;
        searchKeyword = request.query.searchKeyword || "";
    } else {
        limit = resPerPage;
        skip = (page - 1) * resPerPage
    }


    let countQuery = User.count();

    User.find({})
        .limit(limit)
        .skip(skip)
        .sort(sort)
        .select("-password")
        .then(data => {
            countQuery.then((countData) => {
                if (data && data.length) {
                    let result = {
                        "items": data,
                        "totalRecords": countData,
                        "totalResult": data.length,
                        "pagination": !(request.query.pagination && request.query.page) ? false : "",
                        "totalPages": Math.ceil(countData / resPerPage),
                    }
                    if (request.query.pagination && request.query.page) {
                        result["pagination"] = {
                            "totalRecords": countData,
                            "totalPages": Math.ceil(countData / resPerPage),
                            "currentPage": page,
                            "resPerPage": resPerPage,
                            "hasPrevPage": page > 1,
                            "hasNextPage": page < Math.ceil(countData / resPerPage),
                            "previousPage": page > 1 ? page - 1 : null,
                            "nextPage": page < Math.ceil(countData / resPerPage) ? page + 1 : null
                        }
                    } else {
                        if (request.query.limit) {
                            result["limit"] = limit
                        }
                        if (request.query.skip) {
                            result["skip"] = skip
                        }
                    }
                    sendResponse(response, false, 200, 2000, result);
                } else {
                    sendResponse(response, false, 200, 4002);
                }
            })
        })
        .catch(error => {
            sendResponse(response, true, 500, 4001, error);
        })
};


/**
 * Get Location.
 * 
 * @param {string} id
 *
 * @returns {Object}
 */

exports.getUser = async (request, response) => {
    try {
        let id = request.params.id;
        let result = await User.findById(id).select("-password");
        if (!result) {
            return sendResponse(response, false, 422, 4002);
        }
        sendResponse(response, false, 200, 2004, result);
    } catch (error) {
        sendResponse(response, true, 500, 4001, error);
    }
};


/**
 *   Update Location.
 *
 * @param {string} id
 *
 * @returns {Object}
 */

exports.updateUser = async (request, response) => {
    try {
        let id = request.params.id;
        let data = request.body;
        let result = await User.findByIdAndUpdate(
            id,
            {
                $set: data
            },
            {
                new: true
            }
        ).select("-password");
        if (!result) {
            return sendResponse(response, false, 422, 4002);
        }
        sendResponse(response, false, 200, 2002, result);
    } catch (error) {
        sendResponse(response, true, 500, 4001, error);
    }
};


/**
 * Delete Location.
 *
 * @param {string} id
 *
 * @returns {Object}
 */

exports.deleteUser = async (request, response) => {
    try {
        let id = request.params.id;
        let result = await User.findByIdAndDelete(id).select("-password");
        if (!result) {
            return sendResponse(response, false, 422, 4002);
        }
        sendResponse(response, false, 200, 2003, result);
    } catch (error) {
        sendResponse(response, true, 500, 4001, error);
    }
};
