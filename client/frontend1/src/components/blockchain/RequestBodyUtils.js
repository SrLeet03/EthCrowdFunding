import React from 'react'

import Alert from 'react-bootstrap/Alert';

import { Button } from 'react-bootstrap'

export default function RequestBodyUtils({data}) {

    const handleSubmitRequest = () =>{

    }
  return (
    <div>
        <Alert style={{width:'35rem'}} key='info' variant='info'>
           Status : {data["status"]}
           <><br/></>
          {data["description"]}
          <><br/><br/></>
          amount requested : {data['amount']}  (in eths)
          <><br/></>
          Deadline : {data['deadline']}

          <><br/></>
          <>
           <Button variant="success" onClick={handleSubmitRequest}>Approve</Button> {'    '}{' '}
           <Button variant="danger" onClick={handleSubmitRequest}>Deny</Button>
          </>
        </Alert>
    </div>
  )
}
