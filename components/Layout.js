import Navbar from "./Navbar";


export default function Layout({ children }) {

    return (

        <div id="app" className="flex flex-col container   max-w-[100%] bg-gradient-to-r from-indigo-300 to-purple-400 min-h-full ">


            <div className="flex flex-col max-h-[100%] max-w-[100%]">

                <div className="border shadow-b-md">
                    <Navbar />
                </div>

                <div className="flex justify-center">
                    <div className="mt-6 w-full ">
                        {children}
                    </div>
                </div>

            </div >
            <br />
            <div className="mt-20 ">
                <footer className="mt-24  text-gray-700 body-font">
                    <div className="bg-gray-300">
                        <div className="container font-bold text-2xl mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                            <p className="text-gray-900 text-sm text-center sm:text-left">
                                © 2022 Xpace —
                                i-Jo3l
                            </p >
                        </div >
                    </div >
                </footer >

            </div >

        </div >

    )
}