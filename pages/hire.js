import Layout from "../components/Layout";
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import { useContext, useEffect, useState } from "react"
import Link from 'next/link'
import { UserContext } from "../context/user";


const Hire = () => {
    const [users, setUsers] = useState([]);
    const { userDetails, getUser, setToggle } = useContext(UserContext)


    // Load all courses
    useEffect(async () => {
        // add your Realm App Id to the .env.local file
        setToggle(false)

        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        try {
            const user = await app.logIn(credentials);
            const allCourse = await user.functions.xpaceViewUsers();
            setUsers(() => allCourse);

        } catch (error) {
            console.error(error);
        }
    }, [users]);


    return (

        <Layout>
            <div className="p-4 mx-auto max-w-lg bg-white rounded-lg border shadow-md sm:p-8 ">
                <div className="flex justify-between items-center mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 ">New users</h5>
                    <a href="#" className="text-xl font-medium text-blue-600 hover:underline ">
                        ...
                    </a>
                </div>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 ">
                        {users.map((user, index) => (
                            <li key={index} className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src={user.profileImage} alt="Neil image" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate ">
                                            {user.name}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate ">
                                            {user.walletAddress}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                                        <a href={`/page?id=${user.walletAddress}`} className="py-2 px-3 text-white rounded-lg bg-blue-600 ml-auto font-semibold">
                                            Hire
                                        </a>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
}

export default Hire;