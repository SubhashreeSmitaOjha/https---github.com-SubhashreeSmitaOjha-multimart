import React,{useState} from "react";
import { Container,Row,Col,Form,FormGroup } from "reactstrap";
import {toast} from "react-toastify";
import {db,storage} from '../firebase.config'
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const AddProduct = () => {
  
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDescription, setEnterShortDescription] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [Loading,setLoading] = useState(false);

  const navigate = useNavigate()

  const addProduct=async(e)=>{
    e.preventDefault();
    setLoading(true)
    
    try{
      const docRef = await collection(db,'products')
    const storageRef = ref(storage,`productImages/${Date.now()+ enterProductImg.name}`)
    const uploadTask = uploadBytesResumable(storageRef, enterProductImg)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optional: Handle progress if needed
      },
      (error) => {
        // Handle unsuccessful uploads
       
        toast.error("Image upload failed. Please try again.");
      },async ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL)=>{
        await addDoc(docRef, {
          title:enterTitle,
      shortDescription:enterShortDescription,
      description:enterDescription,
      category:enterCategory,
      price:enterPrice,
      ImgURL:downloadURL
        });
      });
    });
    setLoading(false);
    toast.success("product successfully added!");
    navigate('/dashboard/all-products')
    } catch (err){
      setLoading(false);
      toast.error("product not added!");
    }
  };



  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
              {
                Loading ? <h4 className="py-5">Loading.....</h4> : <>

<h4 className="mb-5">Add Product</h4>
              <Form onSubmit={addProduct}>
                <FormGroup className="form__group">
                  <span>Product Title</span>
                  <input type="text" placeholder="Double Sofa" value={enterTitle} 
                    onChange={(e) => setEnterTitle(e.target.value)} required/>
                </FormGroup>
                <FormGroup className="form__group">
                  <span>Short Description</span>
                  <input type="text" placeholder="Short Description" value={enterShortDescription} 
                    onChange={(e) => setEnterShortDescription(e.target.value)} required/>
                </FormGroup>
                <FormGroup className="form__group">
                  <span>Description</span>
                  <input type="text" placeholder="Description" value={enterDescription} 
                    onChange={(e) => setEnterDescription(e.target.value)} required/>
                </FormGroup>
                <div className="d-flex align-items-center justify-content-between gap-5">
                  <FormGroup className="form__group w-50">
                    <span>Price</span>
                    <input type="number" placeholder="Rs.500" value={enterPrice} 
                    onChange={(e) => setEnterPrice(e.target.value)}/>
                  </FormGroup>
                  <FormGroup className="form__group w-50">
                  <span>Category</span>
                  <select className="w-100 p-2" value={enterCategory} 
                    onChange={(e) => setEnterCategory(e.target.value)}>
                    <option value="chair">Chair</option>
                    <option value="watch">Watch</option>
                    <option value="sofa">Sofa</option>
                    <option value="mobile">Mobile</option>
                    <option value="wireless">Wireless</option>
                  </select>
                </FormGroup>
                </div>
                <div>
                  <FormGroup className="form__group">
                    <span>Product Image</span>
                    <input type="file" onChange={(e) => setEnterProductImg(e.target.files[0])} required/>
                  </FormGroup>
                </div>
                <button className="buy__btn" type="submit">Add Product</button>
              </Form>
                </>
              }
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProduct;