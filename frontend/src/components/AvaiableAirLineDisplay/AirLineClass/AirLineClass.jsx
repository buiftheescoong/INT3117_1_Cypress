
import AirLineClassDisplayForm from "./AirLineClassForm";

console.log("check class")


const AirLineClass = (props) =>{

    console.log("check class type fee : " + JSON.stringify(props.pricesEachClass))


    return (
        <div className="flex flex-row w-[40%] md:w-[50%] h-[80%] md:h-[100%] justify-center md:gap-10">
            <AirLineClassDisplayForm _class= "Economy" color="#00008B"
                    price={props.pricesEachClass["Economy"]}
                    changeClassTypeInfors={props.changeClassTypeInfors}
                    
                    ></AirLineClassDisplayForm>

            <AirLineClassDisplayForm _class= "Business" color="#00008B"
                    price={props.pricesEachClass["Business"]}
                    changeClassTypeInfors={props.changeClassTypeInfors}
                    
             ></AirLineClassDisplayForm>



        </div>
        
    )
}

export default AirLineClass;