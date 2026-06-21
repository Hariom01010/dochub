import { getUserByEmail } from "@/repositories/user.repository";
import { CreateUserInput } from "@/schemas/user.schema";

export const createUser = async (data: CreateUserInput)=>{
    const userExists = await getUserByEmail(data.email);
    if(userExists) {
        throw new Error('User Already Exists!')
    }
    console.log(data)
    return data;
}