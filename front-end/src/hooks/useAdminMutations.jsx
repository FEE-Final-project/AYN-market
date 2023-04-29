import { useMutation } from "@apollo/client";
// import {useNavigate} from 'react-router-dom'
import AdminMutations from '../api/adminMutations.api';
// import { useAuthContext } from "./useAuthContext";



export const useAdminMutations = () => {
  
    const [addCategory] = useMutation(AdminMutations.addCategory(),{
        refetchQueries: ['CategoryList'],
    });
    const [deleteCategory] = useMutation(AdminMutations.deleteCategory(),{
        refetchQueries: ['CategoryList'],
    });
    const [updateCategory] = useMutation(AdminMutations.updateCategory(),{
        refetchQueries: ['CategoryList'],
    });

    const addCategoryApi = async (input)=>{
        // console.log(input)
            const res = await addCategory({ variables: { input } });
            // console.log(res)
            return res;
    }

    const deleteCategoryApi = async (input)=>{
        const res = await deleteCategory({ variables: { input } });
        return res;
    }
   
    const updateCategoryApi = async (input)=>{
        console.log(input)
        const res = await updateCategory({ variables: { input } });
        return res;
    }

    return{
        addCategoryApi,
        deleteCategoryApi,
        updateCategoryApi,
    }
}

