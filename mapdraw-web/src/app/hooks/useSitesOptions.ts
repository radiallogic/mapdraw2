// import React, { useState, useEffect } from "react";

// import {Site, AutoCompleteOption} from "@/app/coreTypes"

// function useSiteOptions():AutoCompleteOption[] {

// const [data, setData] = useState<Site[]>([]);

// useEffect( () => {
//   fetch('/api/sites')
//   .then((res) => res.json())
//   .then((data) => {
//     setData(data)
//   })
// }, [])

//     const output = data.map( (value, index) => {
//       return {label: value.name, value: value.id}
//     })

//     //console.log("output: ", output)

//     return output;
// }

// export default useSiteOptions
