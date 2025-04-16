
const DistanceDetails = (props) => {

    const quantitiesStop = props.quantitiesStop + " stop";

    return (
        <div className="w-[100%]">
            <div div className="flex flex-row items-center w-[100%]">

            <svg width="100%" height="10">
                <line x1="0" y1="5" x2="90%" y2="5" stroke="black" stroke-width="1" />
            </svg>

                <div className="flex flex-row text-[12px] md:text-xl">
                    <p>Fly straight</p>
                    
                </div>

                <svg width="100%" height="10">
                    <line x1="10%" y1="5" x2="100%" y2="5" stroke="black" stroke-width="1" />
                </svg>

            </div>

            {/* <div className="text-center">
                <p>{quantitiesStop}</p>
            </div> */}
        </div>
    );
}

export default DistanceDetails;