import Layout from "../components/Layout";
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import { useContext, useEffect, useState } from "react"
import Link from 'next/link'
import { UserContext } from "../context/user";


const Hire = () => {

    const router = useRouter()
    const [trxs, setTrxs] = useState([]);
    const [loading, setloading] = useState(true)
    const [isTrx, setisTrx] = useState(true)

    const { userDetails, getUser, setToggle } = useContext(UserContext)

    getUser()

    useEffect(() => {
        setToggle(false)
    }, [])


    // Load all courses
    useEffect(async () => {

        // add your Realm App Id to the .env.local file
        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();


        try {
            const user = await app.logIn(credentials);
            const allTrx = await user.functions.xpaceUserTrx(userDetails.walletAddress);
            setTrxs(() => allTrx);
            setloading(false)

        } catch (error) {
            console.error(error);
        }
    }, [trxs]);


    // approve order
    const approveOrder = async (arg) => {

        const approveTrx = {
            owner: userDetails.walletAddress,
            buyer: arg.buyer,
            courseid: userDetails.walletAddress + arg.buyer + arg.name,
            price: arg.price,
            name: arg.name,
            pdf: arg.pdf,
            file: arg.file,
            status: "success"
        };

        console.log(approveTrx.courseid)


        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        try {

            const user = await app.logIn(credentials);

            if (user) {

                const insertO = await user.functions.xpaceapproveOrder(approveTrx);

                console.log(insertO)

                router.push({
                    pathname: `/orderTrx`,
                });

            }

        } catch (error) {
            console.error(error);
        }
    }



    return (
        <Layout>
            <div className="h-full w-full lg:px-40 px-3 py-2 lg:py-3">

                <div className="py-2  mb-5 flex justify-center">
                    <p className="text-2xl font-bold text-gray-100">Transactions</p>

                </div>
                {loading && (
                    <div
                        id="popup-modal" tabIndex="-1"
                        className="relative overflow-y-auto overflow-x-hidden 
                    top-20 mx-auto p-5 border w-40 shadow-lg rounded-md bg-gray-200 md:inset-0 h-modal -mb-40 "
                    >
                        <div className="text-center">

                            <div className="text-center">
                                <svg role="status" className="inline mr-2 w-20 h-20 text-white animate-spinfill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>

                        </div>
                    </div>
                )}


                <div
                    className={loading ? "max-w-md mx-auto p-4  shadow-lg rounded-lg overflow-hidden md:max-w-lg"
                        : "max-w-md mx-auto p-4 bg-gray-100 shadow-lg rounded-lg overflow-hidden md:max-w-lg"
                    }
                >
                    {trxs ?
                        <ul className="mx-auto w-10/12 mt-8">
                            {trxs.map((trx, index) => (
                                <li key={index} className="flex border-2 p-3 border-gray-400 mb-4 rounded-lg">
                                    <div className="flex flex-row items-center justify-between"  >

                                        <div className="flex flex-col items-left justify-center ml-3">
                                            <p className="text-black font-semibold text-lg">{trx.name}</p>
                                            <p className="text-gray-600 font-semibold">Status:
                                                {trx.status == "success" ? <span className="ml-4 text-green-600">{trx.status}...</span> : <span className="ml-4 text-red-700">{trx.status}...</span>}
                                            </p>
                                        </div>

                                    </div>
                                    {trx.owner == userDetails.walletAddress ? <a onClick={() => approveOrder(trx)} className="p-3 text-white rounded-lg bg-green-600 ml-auto font-semibold">
                                        <button> Approve Order</button>
                                    </a> : <a href={`/page?id=${trx.owner}`} className="p-3 text-white rounded-lg bg-blue-600 ml-auto font-semibold">
                                        <button> Send Message</button>
                                    </a>}


                                </li>

                            ))}
                        </ul> : <div className="mx-auto w-10/12 mt-8">
                            <h1 className="font-bold text-2xl">No Transactions yet</h1>
                        </div>}
                </div>

            </div>


        </Layout>
    );
}

export default Hire;