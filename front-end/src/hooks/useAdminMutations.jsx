import { useMutation } from "@apollo/client";
// import {useNavigate} from 'react-router-dom'
import AdminMutations from '../api/adminMutations.api';
// import { useAuthContext } from "./useAuthContext";
import { useFetchCategoriesApi } from './useAdminQueries';


export const useAdminMutations = () => {
    const { reloadCategories} = useFetchCategoriesApi(3,3,null,null);
    const [addCategory] = useMutation(AdminMutations.addCategory());
   
    const addCategoryApi = async (input)=>{
        const res = await addCategory({ variables: { input } });
        reloadCategories();
        return res;
    }

    return{
        addCategoryApi
    }
}

