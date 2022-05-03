import Layout from "../components/Layout";
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import { UserContext } from "../context/user";
import Web3 from "web3";
import { HarmonyAddress, randomByte, } from "@harmony-js/crypto";


const Home = () => {

  const { toggle, createUser, setToggle, loading } = useContext(UserContext)




  return (
    <div>
      <header className="text-gray-700 body-font border-b border-gray-200">
        <div className="container mx-auto  flex-wrap p-2 flex md:flex-row items-center">
          <a className="flex  title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="/" target="_blank">
            <img src="/assets/svg.svg" className="w-4 md:w-20  sm:h-9 md:mt-0 mt-6 mr-2 md:mr-3" />
            <span className="ml-3 text-lg md:text-xl md:mt-0 mt-6 mr-3 md:mr-0 font-bold">Xpace</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a href="https://docs.harmony.one/home/general/wallets/browser-extensions-wallets/metamask-wallet/adding-harmony" className="mr-5 p-1 bg-blue-400 text-gray-100 font-semibold 
            rounded-lg border-blue-200 border-2 mt-4 md:mt-0 hover:text-black 
            hover:bg-white">How to Use </a>

          </nav>
          <button onClick={createUser} className="inline-flex items-center 
          text-white font-bold  bg-green-500 border-0 py-1 px-3 
          focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0">
            {loading ?
              <svg role="status" className="inline mr-2 w-5 h-5 text-white animate-spin  fill-gray-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              : <div >Connect</div>
            }
            <svg fill="none" stroke="currentColor"

              className="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>
      <section className="text-gray-700 body-font">
        <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Xpace
              <br />
              <span className="hidden lg:inline-block text-gray-500 text-2xl sm:text-2xl" ><a href="https://twitter.com/naval">@i-Jo3l</a> </span>
            </h1>
            <p className="mb-8 text-xl leading-relaxed">
              Get the best of the Web 3.0 experience
              Skill up to success in Web3.0
              Learn in-demands skill to advance your career in Web 3.0 in a decentralized space
              Xpace is here to aid individuals in the successful transition from web2.0 to web3.0
            </p>

          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded" alt="hero"
              src="/assets/hero.jpg" />
          </div>
        </div>
      </section>
      <section className="text-gray-700 body-font border-t border-gray-200">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-10">

            <h1 className="sm:text-3xl text-2xl font-medium border-b-2 
            border-black title-font text-gray-900 py-4">About Xpace</h1>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <svg fill="none" stroke="currentColor"

                      className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">WHY THE WORLD NEEDS XPACE</h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base">The world is evolving businesses are moving into the virtual space, currencies are more virtual. Basically web3.0 is taking over and there are countless opportunity on there.
                    Xpace project is here to help people transition and gain knowledge of whatever part of web3 you love
                  </p>

                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <svg fill="none" stroke="currentColor"

                      className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">UNIQUENESS OF XPACE</h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base">
                    ◉ Help users with learning web3 skills <br />
                    ◉ Make income for web3 experts who are willing to Teach<br />
                    ◉ Also Expose web3 experts and professionals to job opportunity<br />
                    ◉ Help sponsors find experts to take on their web3 project<br />
                    ◉ Your web, your space there is no limit to what you can earn and learn
                  </p>

                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <svg fill="none" stroke="currentColor"

                      className="w-5 h-5" viewBox="0 0 24 24">
                      <circle cx="6" cy="6" r="3"></circle>
                      <circle cx="6" cy="18" r="3"></circle>
                      <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                    </svg>
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">XPACE TOKEN</h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base">
                    The xpace Token is Created on top of <span className="font-bold">SOLANA NETWORK</span> to aid Decentralised, easy ,faster  and secure transactions on the WebApp.
                    the token is created on top of <span className="font-bold">SOLANA NETWORK</span>, Blockchain that can process many more transactions per second and charge lower transaction fees.
                  </p>

                </div>
              </div>
            </div>
          </div>
          <button onClick={createUser} className="flex mx-auto mt-16 text-white 
          bg-indigo-500 border-0 py-3 px-8 
          focus:outline-none hover:bg-indigo-600 rounded text-lg">

            {loading ?
              <svg role="status" className="inline mr-2 w-10 h-10 text-white animate-spin  fill-gray-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              :
              "Connect"
            }

          </button>

        </div>



      </section>



      <footer className="text-gray-700 body-font">
        <div className="bg-gray-200">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-500 text-sm text-center sm:text-left">© 2022 Xpace —
              <a href="https://twitter.com/thexovc" className="text-gray-600 ml-1" target="_blank" rel="noopener noreferrer">@i-jo3l</a>
            </p>
          </div>
        </div>
      </footer>


      {/* modal start */}

      {toggle && <div id="popup-modal" tabIndex="-1" className="flex justify-center w-full h-full items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
        <div className="relative p-4 w-full max-w-md h-full md:h-auto ">

          <div className="relative bg-white border-2 border-indigo-900 rounded-lg shadow dark:bg-gray-700">

            <div className="flex justify-end p-2">
              <button onClick={() => setToggle(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
            </div>
            <div className="p-6 pt-0 text-center">
              <svg className="mx-auto mb-4 w-14 h-14  text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path

                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <h3 className="mb-5 text-lg text-gray-500 font-bold dark:text-gray-700">Phatom Wallet not detected</h3>
              <h3 className="mb-5 text-xl font-normal text-gray-500 dark:text-gray-400">You must have a Solana wallet to continue</h3>
              <button onClick={() => setToggle(false)} data-modal-toggle="popup-modal" type="button" className="font-bold text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800  rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Yes, I Understand
              </button>
            </div>
          </div>
        </div>
      </div>}


      {/* modal end */}



    </div>
  );
}

export default Home;