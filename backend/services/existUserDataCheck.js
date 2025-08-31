import User from '../models/users.model.js'

export const existUserDataCheck = async (data) => {
        const existUserData = await User.exists(data)
        return existUserData 
}
