import Layout from "../components/Layout";
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import { useContext, useEffect, useState } from "react"
import Link from 'next/link'
import { UserContext } from "../context/user";

const Page = () => {
    const [tuser, setTUser] = useState([]);

    const { userDetails, getUser, setToggle } = useContext(UserContext)

    getUser()
    // console.log(userDetails)

    useEffect(() => {
        setToggle(false)
    }, [])


    useEffect(async () => {

        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        try {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const profileID = urlParams.get("id")


            const resp = await window.solana.connect();
            const address = resp.publicKey.toString()
            // console.log(address)

            if (address) {
                const user = await app.logIn(credentials);
                const myDetails = await user.functions.xpaceGetUser(profileID);
                setTUser(() => myDetails);
                // console.log(tuser)

            } else {
                router.push({
                    pathname: `/`,
                });
            }

        } catch (error) {
            console.error(error);
        }


    }, [tuser]);



    return (
        <Layout>
            <div className="max-w-sm mx-auto mt-8 md:mt-20 shadow-sm shadow-black  bg-white rounded-lg border border-gray-200 shadow-md  ">
                <div className="flex justify-end px-4 pt-4">


                </div>
                <div className="flex flex-col items-center pb-10">
                    <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src={tuser.profileImage} alt="Profile image" />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 ">{tuser.name}</h5>
                    <h5 className="mb-1 font-medium text-gray-600 ">{tuser.walletAddress}</h5>
                    <span className="text-sm text-gray-500 ">{tuser.bio}</span>
                    <div className="flex mt-4 space-x-3 lg:mt-6">
                        <a href={`/chat?id=${tuser.walletAddress}&sender=${userDetails.walletAddress}`} className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Message</a>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Page;