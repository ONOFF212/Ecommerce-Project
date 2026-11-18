
import { AUTH_SIGNUP_API, AUTH_LOGIN_API, USER_UPDATE_API} from "../constants/constants";
const signupApi = AUTH_SIGNUP_API;
const loginApi = AUTH_LOGIN_API;
const updateApi = USER_UPDATE_API;
import { signupInput, loginInput, updateInput} from "../types/user";

async function getErrorMessage(response:Response):Promise<string>{
    try{
        const body = await response.json();
        return body.message || "Request Failed";
    }catch{
        return "Request Failed";
    }
}

// async function saveToken(response:Response) {
//     const token = response.headers.get("Authorization");
//     if(token){
//         localStorage.setItem("Bearer", token);
//     }
// }

export async function signupUser(data:signupInput) {
    const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}${signupApi}`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data),
    });

    const responseData = await response.json();

    if(!response.ok) {
        throw new Error(await getErrorMessage(response));
    }
    
    
    if(responseData && responseData.user){
        localStorage.setItem("Current user", JSON.stringify(responseData.user));
        if(responseData.Token){
            localStorage.setItem("Bearer", responseData.Token);
        }
    }
    return responseData;
} 

export async function loginUser(data:loginInput) {

    const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}${loginApi}`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data),
    })

    const responseData = await response.json();

        if (!response.ok) {
            alert(JSON.stringify(responseData.message) || "Login failed");
            alert("Email or Password doesn't Match");
            throw new Error(await getErrorMessage(response));
        }

        if (responseData && responseData.user) {
            localStorage.setItem("Current user", JSON.stringify(responseData.user));
            
            if(responseData.Token){
               localStorage.setItem("Bearer", responseData.Token);
            }
        }

    return responseData;
}

export async function updateUser(data:updateInput){
    
    const token = localStorage.getItem("Bearer");
    
    const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}${updateApi}`, {
        method:'PUT',
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify(data),
    });

    const responseData = await response.json();
        if (!response.ok) {
            alert(responseData.message || "Failed to Update");
            alert("Failed to Update Details");
            return ;
        }

        if (responseData && responseData.user) {
            localStorage.setItem("Current user", JSON.stringify(responseData.user));
        }

        return responseData;
};