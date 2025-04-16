
import { BACKENDURL } from "../Config/Config.js";

const getSpecifiedFlight = (id, history, setCurrentFlight, setLoading, setTicketPrice, classTypeExtraFee) => {
    const token = localStorage.getItem("token");
    setTimeout(() => {
      fetch(BACKENDURL + "/api/flights/getSingleFlight/" + id, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          
          if (data.success === false) {
            window.scrollTo(0, 0);
            history("/");
            return;
          }


          console.log("checkData price : " + data.price + "with class type fee " + classTypeExtraFee);

          let price = data.price * (1 + classTypeExtraFee);

          console.log("check final price : " + price);

          setCurrentFlight(data);

          setTicketPrice(prev => ({
            ...prev, 
            price: price, 
          }));

          setLoading(false);

        });
    }, 1000);
    window.scrollTo(0, 0);
};

export default getSpecifiedFlight;