import { useState, useEffect } from "react";
import axios from "axios";
import { useWeb3React } from '@kazamaswap/wagmi';
import { useModal } from "@kazamaswap/uikit";
import { getUserData } from "utils/apiRoutes";
import ActivateSession from 'views/Profile/components/Login/sessionModal'

const CheckLogin = () => {
    const { account } = useWeb3React()
    const [onPresentSessionModal] = useModal(<ActivateSession />)
    const [userData, setUserData] = useState({
        general_data: {
            has_password: false,
        },
        session_data: {
            active: false,
        }
    });

    // Fetch data
    const fetchData = async() => {
        await axios.get(`${getUserData}/${account}`).then((response) => {
          setUserData(response.data)
        });
    }

    // Execute retrieving
    useEffect(() => {
        fetchData()
    }, [account, userData.session_data.active])

    // Check if has_password = true
    useEffect(() => {
        if (userData.general_data.has_password && !userData.session_data.active) {
            onPresentSessionModal();
        }
    }, [userData.general_data.has_password, userData.session_data.active, onPresentSessionModal]);

    return null; // or any other JSX if needed
}

export default CheckLogin;