"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function verifySession(path?:string) {
    
    const user = cookies().get("user");
    
    if (cookies().getAll().length === 0 || user?.value == "") {
        console.log("not lol");
        
        return true;
    }
    if (path == "/auth") {
        console.log("lol");
        
        redirect("/");
    }
    return false;
}





