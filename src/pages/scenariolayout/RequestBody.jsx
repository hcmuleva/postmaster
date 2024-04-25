import React,{useEffect} from 'react';

const RequestBody = ({stepdata}) => {
    console.log("RequestBody",stepdata)
    const [payaloddata,setPayloadData] = React.useState(stepdata['payload'])
    useEffect(() => {
        setPayloadData(stepdata['payload']);
    }, [stepdata]);

    return (
        <div>
        <textarea
          style={{
            width: "100%",
            height: "270px",
            fontSize: "1rem",
            padding: "1rem",
          }}
          value={payaloddata}
          onChange={(e) =>{setPayloadData(e.target.value)
            stepdata['payload']=e.target.value}}
        ></textarea>
      </div>
    );
};

export default RequestBody;