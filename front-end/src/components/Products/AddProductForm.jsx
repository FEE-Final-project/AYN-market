import React,{useState} from 'react'
import{ useAdminMutations} from '../../hooks/useAdminMutations';
import { useFetchCategoriesApi } from '../../hooks/useAdminQueries';

export default function AddProductForm() {
  const {addProductApi} = useAdminMutations();

  const {data:categoryData,loading:categoryLoading,error:categoryError} = useFetchCategoriesApi();
  
  const [productData,setProductData] = useState({
    name:'',
    description:'',
    price:0,
    category:'',
    isAvailable:true,
    stock:0,
    image:null
   }
)

 const [productFormError,setProductFormError] = useState("");
 const [loadingForm,setLoadingForm] = useState(false);

 const handleChange = (e)=>{
         if(e.target.name === 'image'){
            setProductData({...productData,[e.target.name]:e.target.files[0]})
            return;
         }
        setProductData({...productData,[e.target.name]:e.target.value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoadingForm(true);
        if(productData.price < 0 || productData.stock < 0){
            setProductFormError("Price and Stock cannot be negative numbers");
            setLoadingForm(false);
            return;
        }
        if(!/^\d+$/.test(productData.stock)){
         setProductFormError("Stock must be an integer number");
         setLoadingForm(false);
         return;
        }
        const {name,description,price,category,isAvailable,stock,image} = productData;
        const product = {name,description,price:Number(price),category,isAvailable,stock:Number(stock),image}
        const {data} = await addProductApi(product);
        if(data.createProduct.errors){
            console.log(data)
            setProductFormError(data.createProduct.errors[0]);
            setLoadingForm(false);
            return;
        }
        setProductFormError("");
        setLoadingForm(false);
        setProductData({
            name:'',
            description:'',
            price:0,
            category:'',
            isAvailable:true,
            stock:0,
            image:null
              }
        )
    }
  return (
    <form className="flex flex-col w-fit lg:w-full mx-auto  gap-3 mb-5 bg-red-200 p-5 rounded shadow-lg"  onSubmit={(e)=>{
        handleSubmit(e);
        }}>
        {productFormError && <p className="text-red-300 bg-red-900 text-center rounded p-3">{productFormError}</p>}
        <label htmlFor="productName" className='text-gray-900 font-mono'>Product Name</label>
        <input type="text" className='rounded outline-0 border-0' name="name" id="productName" value={productData.name} onChange={handleChange} required />
        <label htmlFor='productPrice' className='text-gray-900 font-mono'>Product Price</label>
        <input type="number" className='rounded outline-0 border-0' name="price" id="productPrice" value={productData.price} onChange={handleChange} required />
        <label htmlFor="productStock" className='text-gray-900 font-mono'>Product Stock</label>
        <input type="number" className='rounded outline-0 border-0' name="stock" id="productStock" value={productData.stock} onChange={handleChange} required />
        <label htmlFor="productCategory" className='text-gray-900 font-mono'>Product Category</label>
        <select name="category" id="productCategory" className='rounded outline-0 border-0' value={productData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {   categoryLoading ? <option value="">Loading Categories...</option> :
                categoryError ? <option value="">Error Loading Categories</option> :
                categoryData?.categoryList?.edges?.map(({node})=>{
                    return <option key={node.id} value={node.id}>{node.categoryName}</option>
                })
            }
        </select>
        <label htmlFor="description" className='text-gray-900 font-mono' >Product Description</label>
        <textarea name="description" className='rounded outline-0 border-0' id="description" value={productData.description} onChange={handleChange} cols="30" rows="5" required></textarea>
  
        <label htmlFor="image" className='text-gray-900 font-mono'>Upload Category Image</label>
        <input id="image" name='image' type="file" className='bg-gray-500 text-white' onChange={handleChange}  />

        <button className="bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow" disabled={loadingForm} type="submit"> {loadingForm ? "Creating your Product" : "Add Product"}  </button>
      </form>
  )
}
