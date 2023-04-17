import { useMutation } from "@apollo/client";
import {useNavigate} from 'react-router-dom'
import AdminMutations from '../api/adminMutations.api';
// import { useAuthContext } from "./useAuthContext";

export const useAdminMutations = () => {
    const [addCategory] = useMutation(AdminMutations.addCategory());

    const addCategoryApi = (input)=>{
        console.log(input)
        return addCategory({variables:{input}})
    }

    return{
        addCategoryApi
    }
}

