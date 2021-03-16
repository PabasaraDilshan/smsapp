import {useState} from 'react';
export default function Admin(){
    const [filter,setFilter] = useState("");



    return (<><h1>Admin</h1>
    <select value={filter}  onChange={(e)=>{
        setFilter(e.target.value);
    }}  id = "filter">
        <option value="byid">ById</option>
        <option value="bytype">ByType</option>
    </select>
    
    <p>{filter}</p>
    
    </>);
}