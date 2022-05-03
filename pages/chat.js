import Layout from "../components/Layout";
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import { useContext, useEffect, useState } from "react"
import Link from 'next/link'
import { UserContext } from "../context/user";

const Page = () => {

    const [msgInput, setMsgInput] = useState("");
    const [msgs, setMsgs] = useState([]);
    const [tuser, setTUser] = useState([]);

    const { userDetails, getUser, setToggle } = useContext(UserContext)

    getUser()

    useEffect(() => {
        setToggle(false)
    }, [])


    // reciever
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



    // Load messages
    useEffect(async () => {

        // const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const profileID = urlParams.get("id")
        const sender = urlParams.get("sender")


        const access = {
            sender: sender,
            reciever: profileID
        };

        try {
            const user = await app.logIn(credentials);
            const myMsg = await user.functions.xpaceViewMsg(access);
            setMsgs(() => myMsg);

            // console.log(msgs)

        } catch (error) {
            console.error(error);
        }
    }, [msgs]);


    // send message
    const msgSend = async (e) => {
        e.preventDefault();

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const profileID = urlParams.get("id")


        const msgdetail = {
            uid: userDetails.walletAddress,
            tuid: profileID,
            msg: msgInput
        };

        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        try {


            const user = await app.logIn(credentials);

            if (user) {

                const insertO = await user.functions.xpaceMsg(msgdetail);

                console.log(insertO)
                setMsgInput("")

            }

        } catch (error) {
            console.error(error);
        }
    }




    return (
        <Layout>

            <div className="max-w-sm mx-auto mt-8 md:mt-20 shadow-sm shadow-black  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="overflow-auto h-80">
                    <div className="flow-root mx-4 ">
                        <ul role="list" className="divide-y divide-gray-500 ">
                            {/* {users.map((user, index) => ( */}
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4 border border-gray-600">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src={tuser.profileImage} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {tuser.name}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {tuser.walletAddress}
                                        </p>
                                    </div>

                                </div>
                            </li>
                            {/* ))} */}
                        </ul>
                    </div>

                    <div className="mt-2 mb-16">
                        {msgs.map((msg, index) => (
                            <div key={index}>
                                {
                                    userDetails.walletAddress === msg.uid.sender ?


                                        <div className="clearfix">
                                            <div
                                                className="bg-green-300 float-right w-3/4 mx-4 my-2 p-2 rounded-lg clearfix"
                                            >{msg.msg}</div>
                                        </div>


                                        :
                                        <>
                                            <br />
                                            <div className="clearfix">
                                                <div
                                                    className="bg-gray-300 float-left w-3/4 mx-4 my-2 p-2 rounded-lg"
                                                >{msg.msg}</div>
                                            </div>
                                        </>
                                }
                            </div>
                        ))}
                    </div>

                </div>

                <div className="space-x-20 mt-4 bg-green-100 bottom-0 flex">
                    <input
                        className="outline-none flex-grow m-2 py-2 px-4 mr-1 rounded-full border border-gray-300 bg-gray-200 "

                        placeholder="Message..."
                        value={msgInput}
                        onChange={(e) => setMsgInput(e.target.value)}

                    />
                    <button className="m-2 outline-none" onClick={msgSend}>
                        <svg
                            className="svg-inline--fa text-green-400 fa-paper-plane fa-w-8 w-8 h-12 py-2 mr-4"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="paper-plane"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default Page;