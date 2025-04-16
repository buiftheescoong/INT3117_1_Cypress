import React from "react";
import { useEffect, useState } from "react";
import AvaiableService from "./AvaiableService";

const ClassServiceInfors = (props) =>{

    const [avaiableService, setAvaiableService] = useState(null);
    

    useEffect(()=> {
        const services = JSON.parse(localStorage.getItem("ClassTypes"));

        setAvaiableService(services[props.classType]);


    }, [props.classType])

    return (
        <div className={`${props.expanded ? 'h-auto px-2 py-2' : 'h-[0px]'}  w-[100%] bg-gray-200 transition-all duration-300 ease-in-out `}
            style={{
                overflow: 'hidden',
            }}
            >
                {/* avaiableService .include.map((service, index) => {
                        {return <p key={index}>{service}</p>;}
                    }) */}
            
                <div>
                    <p className="font-bold text-[0.9rem] md:text-[1rem]">Include :</p>

                    {avaiableService 
                        ? 
                            avaiableService.include.map((service, index) => 
                                {return <AvaiableService service= {service}></AvaiableService>;}
                        )
                      : null}
                </div>

                <div>
                    <p className="font-bold text-[0.9rem] md:text-[1rem]">Not included:</p>
                    {avaiableService 
                        ? avaiableService.exclude.map((service, index) => {
                            return <AvaiableService service = {service} key={index}></AvaiableService>;
                        })
                      : null}
                </div>

                <div className="w-[100%] flex flex-row  justify-end">
                    <button className="hover:bg-[#015091] bg-[#017DE3] text-black hover:text-white px-5 py-2 mt-5 rounded-lg transition duration-100 w-[100px] md:w-[200px] text-sm md:text-lg"
                    onClick={(e) => {
                        props.handleBookingRedirect()
                    }}>
                         SELECT
                    </button>
                </div>
        </div>
    );
}

export default ClassServiceInfors;