import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate  } from 'react-router-dom'
import {useState , useEffect} from 'react' ;

import { TbArrowBarLeft } from "react-icons/tb";

function CreateCampaign() {

    const history = useNavigate ();

    const handlegoBack = () => {
        history("/fundraisers");
    }
    
    const [campaign , setCampaign] = useState({
        email : null,
        title:null,
        desc : null,
        addr : null,
        amount : null,
        date : null 
    }) ; 

    const handleChange = () =>{
      const { name, value } = e.target;
      setState(prevState => ({
          ...prevState,
          [name]: value
      }));  
    }

    
  return (
    <>
        <button onClick={handlegoBack} style={{ border: 'none', backgroundColor: 'white', textAlign: 'right', padding: '20px'  }} >
                <TbArrowBarLeft/>
        </button>

    <Form style={{maxWidth:'30rem' , marginLeft:'10rem'}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name="email" value={campaign.} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter title" />
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Enter Description" />
        <Form.Label>Amount(in ether)</Form.Label>
        <Form.Control type="number" placeholder="Enter Amount" />
        <Form.Label>Your Arcana Wallet address</Form.Label>
        <Form.Control type="text" placeholder="Enter your Your Arcana Wallet address" />

      </Form.Group>

      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </>
  );
}

export default CreateCampaign;