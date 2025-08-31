import bcrypt from 'bcrypt'

export const passHasher = async(data)=>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(data,salt)
}


export const passCheck = async(password)=>{
    
}