import React, { useState, useEffect } from 'react'


import axois from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Button, Badge , Navbar , Container } from 'react-bootstrap';
import { URL } from '../../helper/helper';
import FundCard from './FundCard'
import axios from 'axios';
import { setFundrs } from '../../redux/actions/action';




export default function FundraiseList() {

    const [tag, setTag] = useState("all categories");
    const [allf, setAllf] = useState([{}]);
    const dispatch = useDispatch();
    useEffect(() => {



        axios.get(`${URL}/getpost/${tag}`)
            .then((result) => {
                setAllf(result.data);
                dispatch(setFundrs(result.data));
            }).catch((err) => {
                console.log(err);
            })

    }, []);
    const handleselect = (arg) => {
        setTag(arg);
        if (arg === "all categories") {
            setAllf(fundrlist);
            return;
        }
        const newFundarr = fundrlist.filter((value) => {

            return (value?.tag === arg);
        });
        setAllf(newFundarr);

    }
    const fundrlist = useSelector((state) => state.allFundrs.fundrs);


    return (
        <div>

            <div className="tags">
                <Navbar sticky="top" expand="sm" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand>Select tag to donate your preferred category fundraiser </Navbar.Brand>
                    </Container>
                </Navbar>
               
                <Button onClick={() => handleselect("all categories")} variant="info">All Categories</Button>{'   '}
                <Button onClick={() => handleselect("medical")} variant="info">Medical</Button>{'   '}

                <Button onClick={() => handleselect("enviroment")} variant="info">Enviroment</Button>{' '}

                <Button onClick={() => handleselect("education")} variant="info">Education</Button>{' '}

                <Button onClick={() => handleselect("health")} variant="info">Health</Button>{' '}

                <Button onClick={() => handleselect("social service")} variant="info">Social Service</Button>{' '}
                <br></br>
                {
                    tag !== "" ? <b> <Badge pill bg="dark">
                        {tag}
                    </Badge> </b> : ""
                }

            </div>

            <br></br>
            <br></br> <br></br>
            { allf!==undefined && allf!==null && allf.length === 0 ?
                <h1>Soory,you can diffenrent catg to donate caz this one has no fundr</h1> : ""}
            <div className="justify-content-md-center">
                <Row class="row ">
                    {
                        allf.map((value, key) => {
                            //console.log(value);
                            const prop = {
                                name: value.userid,
                                title: value.title,
                                time : value.creationtime,
                                date: value.date,
                                tag  :value.tag,
                                amount:value.amount,
                                days : value.days,
                                tagline: "Some quick example text to build on the card title and make up the bulk of the card's"
                            }
                            return <FundCard info={prop} />;
                        })
                    }
                </Row>
            </div>


        </div>
    )
}
