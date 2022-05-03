import React, { useEffect, useState } from "react";
import * as Realm from "realm-web";
import { useRouter } from "next/router";

export const UserContext = React.createContext()



export const UserProvider = ({ children }) => {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState([]);
    const [toggle, setToggle] = useState(false)
    const [loading, setloading] = useState(false)

    const getUser = async () => {
        useEffect(async () => {


            const resp = await window.solana.connect();
            const address = resp.publicKey.toString()

            // console.log(address)

            const userdetail = {
                uid: address,
                name: "Unnamed",
                bio: "Nothing to see here",
                profileImage: "/assets/profile.png",
                walletAddress: address,
            };

            const REALM_APP_ID = "products-qexct";
            const app = new Realm.App({ id: REALM_APP_ID });
            const credentials = Realm.Credentials.anonymous();

            try {


                const user = await app.logIn(credentials);

                if (user) {

                    const insertO = await user.functions.xpaceuser(userdetail);

                    const myDetails = await user.functions.xpaceGetUser(address);
                    setUserDetails(() => myDetails);

                    console.log(insertO)

                    // router.push({
                    //     pathname: `/profile`,
                    // });

                }

            } catch (error) {
                console.error(error);
            }


        }, []);
    }

    const createUser = async () => {

        setloading(true)

        if ("solana" in window) {
            const resp = await window.solana.connect();
            const address = resp.publicKey.toString()

            // console.log(address)


            const userdetail = {
                uid: address,
                name: "Unnamed",
                bio: "Nothing to see here",
                profileImage: "/assets/profile.png",
                walletAddress: address,
            };

            const REALM_APP_ID = "products-qexct";
            const app = new Realm.App({ id: REALM_APP_ID });
            const credentials = Realm.Credentials.anonymous();

            try {


                const user = await app.logIn(credentials);

                if (user) {

                    const insertO = await user.functions.xpaceuser(userdetail);

                    console.log(insertO)

                    router.push({
                        pathname: `/profile`,
                    });

                }

            } catch (error) {
                console.error(error);
            }
        } else {
            setToggle(true)
        }



    }


    return (
        <UserContext.Provider
            value={{
                userDetails,
                getUser,
                createUser,
                toggle,
                setToggle,
                loading
            }}
        >
            {children}
        </UserContext.Provider>
    )

}