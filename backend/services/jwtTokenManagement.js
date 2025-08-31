import jwt from 'jsonwebtoken'

export const tokenGenerator = (userId,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: "1h"
    })
    res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1 * 60 * 1000 * 1000
    })
}

