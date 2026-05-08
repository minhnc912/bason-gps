// import { useEffect, useState } from "react";
// import { getDevices } from "@/services/device.service";

// export function useDevices() {
//     const [devices, setDevices] = useState([]);

//     const fetchDevices = async () => {
//         const res = await getDevices();
//         setDevices(res.data);
//     };

//     useEffect(() => {
//         fetchDevices();
//     }, []);

//     return { devices, fetchDevices };
// }
