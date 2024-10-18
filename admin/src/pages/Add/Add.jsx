import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import './Add.css'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import App from '../../App'

const Add = ({url}) => {
    
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "HolyBooks"
    });
    
    const fileInputRef = useRef(null); // Create a ref for the file input

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        const response = await axios.post(`${url}/api/food/add`, formData);

        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "HolyBooks"
            });
            setImage(false); // Reset the image state
            fileInputRef.current.value = ""; // Clear the file input
            toast.success(response.data.message)
        } else {
            setImage(false);
            toast.error(response.data.message)
        }
    };

    return (
        <div className='add'>
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type='file'
                        id="image"
                        ref={fileInputRef} // Attach ref to the file input
                        hidden
                        required
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type here' />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here...' />
                </div>
                <div className="add-category-price">
                    <div className="add-category flex col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} value={data.category} name="category">
                            <option value="HolyBooks">HolyBooks</option>
                            <option value="Romance">Romance</option>
                            <option value="Mystery">Mystery</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="ScienceFiction">ScienceFiction</option>
                            <option value="Classics">Classics</option>
                            <option value="Horror">Horror</option>
                            <option value="Non-fiction">Non-fiction</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder='$20' />
                    </div>
                </div>
                <button type="submit" className='add-btn'>ADD</button>
            </form>
        </div>
    );
}

export default Add;