import React, { useState } from 'react'
import { useAdminMutations } from '../../hooks/useAdminMutations';
import { useFetchCategoriesApi } from '../../hooks/useAdminQueries';


export default function EditProductForm({ node, setShowEditForm }) {
  const { updateProductApi } = useAdminMutations();

  const { data: categoryData, loading: categoryLoading, error: categoryError } = useFetchCategoriesApi();
  const [productData, setProductData] = useState({
    productName: node.productName,
    description: node.description,
    price: node.price,
    category: node.category.id,
    isAvailable: node.isAvailable,
    stock: node.stock,
    image: node.image,
    images :node.images
  }
  )
  
  const [productFormError, setProductFormError] = useState("");
  const [loadingForm, setLoadingForm] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setProductData({ ...productData, [e.target.name]: e.target.files[0] })
      return;
    }
    if (e.target.name === 'images') {
      setProductData({ ...productData, [e.target.name]: e.target.files })
      return;
    }
    if(e.target.name === 'isAvailable'){
      setProductData({ ...productData, [e.target.name]: e.target.checked })
      return;
    }
    setProductData({ ...productData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingForm(true);
    if (productData.price < 0 || productData.stock < 0) {
      setProductFormError("Price and Stock cannot be negative numbers");
      setLoadingForm(false);
      return;
    }
    if (!/^\d+$/.test(productData.stock)) {
      setProductFormError("Stock must be an integer number");
      setLoadingForm(false);
      return;
    }
    const { productName, description, price, category, isAvailable, stock, image ,images } = productData;
    const product = {id: node.id, productName, description, price: Number(price), category, isAvailable, stock: Number(stock), image,images}
    console.log(product)
    const { data } = await updateProductApi(product);
    console.log(data)
    if (data.updateProduct.errors) {
      console.log(data)
      setProductFormError(data.updateProduct.errors[0]);
      setLoadingForm(false);
      return;
    }
    setProductFormError("");
    setLoadingForm(false);
    setShowEditForm("");
    setProductData({
      productName: '',
      description: '',
      price: 0,
      category: '',
      isAvailable: true,
      stock: 0,
      image: null,
      images:null
    }
    )
  }

  return (
    <form className="flex flex-col  mx-2 my-3  gap-1 bg-red-200 p-3 rounded shadow-lg" onSubmit={(e) => {
      handleSubmit(e);
    }}>
      {productFormError && <p className="text-red-300 bg-red-900 text-center rounded p-3">{productFormError}</p>}
      <label htmlFor="productName" className='text-gray-900 font-mono'>Product Name</label>
      <input type="text" className='rounded outline-0 border-0' name="productName" id="productName" value={productData.productName} onChange={handleChange} required />
      <label htmlFor='productPrice' className='text-gray-900 font-mono'>Product Price</label>
      <input type="number" className='rounded outline-0 border-0' name="price" id="productPrice" value={productData.price} onChange={handleChange} required />
      <label htmlFor="productStock" className='text-gray-900 font-mono'>Product Stock</label>
      <input type="number" className='rounded outline-0 border-0' name="stock" id="productStock" value={productData.stock} onChange={handleChange} required />
      <label htmlFor="productCategory" className='text-gray-900 font-mono'>Product Category</label>
      <select name="category" id="productCategory" className='rounded outline-0 border-0' value={productData.category} onChange={handleChange} required>
        <option value="">Select Category</option>
        {categoryLoading ? <option value="">Loading Categories...</option> :
          categoryError ? <option value="">Error Loading Categories</option> :
            categoryData?.categoryList?.edges?.map(({ node }) => {
              return <option key={node.id} value={node.id}>{node.categoryName}</option>
            })
        }
      </select>
      <label htmlFor="description" className='text-gray-900 font-mono' >Product Description</label>
      <textarea name="description" className='rounded outline-0 border-0' id="description" value={productData.description} onChange={handleChange} cols="30" rows="5" required></textarea>

      <label htmlFor="image" className='text-gray-900 font-mono'>Upload Cover Image</label>
        <input id="image" name='image' type="file" className='bg-gray-500 text-white' onChange={handleChange} />
  
        <label htmlFor="images" className='text-gray-900 font-mono'>Upload Product Images</label>
        <input id="images" name='images' type="file" className='bg-gray-500 text-white' onChange={handleChange} multiple={true} />


      <label for="availability" className="flex items-center cursor-pointer">
        <div className="relative">
          <input type="checkbox" className="hidden" name="isAvailable" id='availability'  onChange={handleChange} checked={productData.isAvailable} />
          
          <div className={`toggle-path  w-10 h-4 rounded-full shadow-inner ${
           productData.isAvailable ? 'bg-green-500' : 'bg-gray-200'
          }`}></div>
          <div className={`toggle-circle absolute w-4 h-4 bg-white rounded-full shadow inset-y-0 ${
           productData.isAvailable ? 'left-6' : 'left-0'
          }`}></div>
        </div>
        <div className="ml-3 text-gray-700 font-medium">product availability</div>
      </label>

      <button className="bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow" disabled={loadingForm} type="submit"> {loadingForm ? "Updating your Product" : "Save Changes"}  </button>
      <button className='text-gray-500 bg-gray-50 rounded font-semibold p-2' onClick={() => setShowEditForm("")}>discard</button>
    </form>

  )
}
