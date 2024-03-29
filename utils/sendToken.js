//create a token and cookie

const sendToken = (user, statuscode, res) => {
    const token = user.getJWTtoken();

    //options for cokkie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
    res.status(statuscode).cookie("token", token, options).json({
        success: true,
        token,
        user,
    })
}

module.exports = sendToken