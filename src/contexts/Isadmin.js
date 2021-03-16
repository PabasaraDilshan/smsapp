



export default function Isadmin(user){
    const id = user.email.split("@");
    if(id[0][0]==="a"|id[0][0]==="A"){
        return true;
    }else{
        return false;
    }
}