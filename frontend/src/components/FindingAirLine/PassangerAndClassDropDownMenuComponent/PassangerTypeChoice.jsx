import React, { useRef, useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
const PassangerTypeChoice = (props) => {

        const [passangers, setPassangers] = useState(0);

        const increaseQuantities = () => {
             setPassangers(passangers + 1);
        }

        const decreaseQuantities = () => {
            let quantities = passangers -1;
            if(quantities < 0){
                quantities = 0;
            }

            setPassangers(quantities);
        }

        useEffect(() => {
            props.handlePassangerAndClassInforsChange(props.passengerType, passangers);
        }, [passangers])

        return (
            <div class="flex flex-row justify-between gap-5 w-[100%]">
                <div>
                    <h1>{props.passengerType}</h1>
                    <p class="text-gray-500 text-[12px]">{props.age}</p>
                </div>

                <div class="flex flex-row gap-2 items-center justify-between w-[100px]">

                    <i className="fa-regular fa-square-minus fa-2x hover:text-gray-500 " onClick={decreaseQuantities}></i>
                    <p className="text-[30px]">{passangers}</p>
                    <i class="fa-regular fa-square-plus fa-2x hover:text-gray-500" onClick={increaseQuantities}></i>

                </div>

            </div>
        );
      
}

export default PassangerTypeChoice