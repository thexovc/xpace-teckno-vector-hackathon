import Layout from "../components/Layout";
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import { useContext, useEffect, useState } from "react"
import Link from 'next/link'
import { UserContext } from "../context/user";

const Profile = () => {
    // const router = useRouter();

    const { userDetails, toggle, getUser } = useContext(UserContext)

    getUser()


    return (
        <Layout>



            <div className="max-w-sm m-2 md:md-0 mx-auto mt-8 md:mt-20 shadow-sm shadow-black  bg-white rounded-lg border border-gray-200 shadow-md ">
                <div className="flex justify-end px-4 pt-4">


                </div>
                <div className="flex flex-col items-center pb-10">
                    <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src={userDetails.profileImage} />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 ">{userDetails.name}</h5>
                    <h5 className="mb-1 font-medium text-sm text-gray-600 ">{userDetails.walletAddress}</h5>

                    <h1 className="font-bold text-gray-800 text-xl">
                        Bio
                    </h1>
                    <span className="text-sm text-gray-500 ">{userDetails.bio}</span>
                    <div className="flex mt-4 space-x-3 lg:mt-6">
                        <Link className="flex-end" href={`/edit_profile?id=${userDetails?.walletAddress}`}>
                            <button className="text-white mt-4 bg-green-700 
                            hover:bg-green-800 rounded-md px-5 py-2.5 font-bold text-center">
                                Edit Profile
                            </button>
                        </Link>
                    </div>
                </div>
            </div>


        </Layout>
    );
}

export default Profile;