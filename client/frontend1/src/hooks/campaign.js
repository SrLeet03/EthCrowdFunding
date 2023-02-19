import {URL} from "../helper/helper.js"
import axios from 'axios';

async function createCampaign(payload){
    try{
        const result = await axios.post(`${URL}/createCampaign/`, {
            name: payload.name,
            description: payload.description,
            donation_target: payload.donation_target,
            public_key: payload.public_key ,
            category:payload.category, 
            profile: payload.profile,
            date_expired: payload.date_expired,
            status: payload.status,
        })
        console.log(result);
        return result;
    }
    catch(err){
        console.log(err);
        return err;
    }
}

async function getAllCampaign(){
    try{
        const result = await axios.get(`${URL}/getAllCampaigns/`)
        console.log(result);
        return result;
    }
    catch(err){
        console.log(err);
        return err;
    }
}
async function getCampaignById(payload){
    try{
        const result = await axios.get(`${URL}/getCampaignById/`,
        {
            params:{
                id:payload.id
            }
        })
        console.log(result);
        return result;
    }
    catch(err){
        console.log(err);
        return err;
    }
}
async function getCampaignByCategory(payload){
    try{
        const result = await axios.get(`${URL}/getCampaignByCategory/`,
        {
            params:{
                category:payload.category
            }
        })
        console.log(result);
        return result;
    }
    catch(err){
        console.log(err);
        return err;
    }
}
async function getCampaignByStatus(payload){
    try{
        const result = await axios.get(`${URL}/getCampaignByStatus/`,
        {
            params:{
                status:payload.status
            }
        })
        console.log(result);
        return result;
    }
    catch(err){
        console.log(err);
        return err;
    }
}
async function updateStatusById(payload){
    try{
        const result = await axios.post(`${URL}/updateStatusById/`,{
            id: payload.id,
            updated_status: payload.updated_status
        })
        console.log(result);
        return result;
    }
    catch(err){
        console.log(err);
        return err;
    }
}
async function updateTargetById(payload){
    try{
        const result = await axios.post(`${URL}/updateTargetById/`,{
            id: payload.id,
            deduct: payload.deduct
        })
        console.log(result);
        return result;
    }
    catch(err){
        console.log(err);
        return err;
    }
}

// const payload = {
//     name: 'dummy1',
//     description: 'test1',
//     donation_target: '1000',
//     public_key: '$013',
//     category:'education', 
//     profile: '',
//     date_expired: '',
//     status: 'pending',
// }
// const payload = {
//     id : '63efeab9402978ef2a9a42e5',
//     deduct : '100'
// }

//createCampaign(payload);
// updateTargetById(payload);

export {createCampaign};
export {getAllCampaign};
export {getCampaignById};
export {getCampaignByCategory};
export {getCampaignByStatus};
export {updateStatusById};
export {updateTargetById};



