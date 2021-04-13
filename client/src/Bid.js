import React, { useRef } from 'react'
import { db } from './firebase/firebase'
import firebase from 'firebase/app'
import userImg from './img/bussiness-man.png'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default function Bid() {
    const buyer = "AZIZI"
    toast.configure()
    const scrollDown = useRef()
    const [messages, setMessages] = React.useState([])
    const [msg, setMsg] = React.useState('')
    const [prd, setPrd] = React.useState()
    const [price, setPrice] = React.useState('')
    const [timer, setTimer] = React.useState(0)
    const [maxGivedPrice, setMaxGivedPrice] = React.useState([{
        buyerName:"",
        createdAt:"",
        givedPrice:""
    }])
    let lastMaxPrice = maxGivedPrice && maxGivedPrice[0].givedPrice;
    function maxPrice() {
        // const maxPrice = 
        db
        .collection("finalBuyer")
        .orderBy("createdAt", "desc")
        .limit(1)
        .onSnapshot((querySnapshot) => {
          const dataPrice = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          setMaxGivedPrice(dataPrice);
        });
    }
    function getProduct() {
        const Product = db.collection('product')
            .limit(1)
            .onSnapshot((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setPrd(data)

                // return allMessages
            })
    }
    function time() {
        db
            .collection("timer")
            .limit(1)
            .onSnapshot((querySnapshot) => {
                const dataTimer = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));

                setTimer(dataTimer[0].seconds);
            });
    }
    // console.log(timer);
    React.useEffect(() => {
        maxPrice()
        time()
        getProduct()
        if (db) {
            const allMessages = db
                .collection('messages')
                .orderBy('date')
                .limit(100)
                .onSnapshot((querySnapshot) => {
                    const data = querySnapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id
                    }))
                    setMessages(data)
                    scrollDown.current.scrollIntoView({ behavior: 'smooth' })
                })

            // return allMessages
        }
    }, [db,maxGivedPrice])
    setTimeout(() => {
        if (timer && timer > 0) {
        //   console.log(timer);
          setTimer(timer && timer - 1);
    
          if (db) {
            db.collection("timer")
              .doc("F1w6RNQ6TxrjJlRbOEtS")
              .update({
                seconds: timer && timer - 1,
              });
          }
        }
      }, 1000);
    const sendMessage = async (e) => {
        e.preventDefault()
        if (db) {
            db.collection('messages').add({
                msg: msg,
                date: firebase.firestore.FieldValue.serverTimestamp(),
                user: 'azizi'
            })
            scrollDown.current.scrollIntoView({ behavior: 'smooth' })
            setMsg('')
            document.getElementById('inp').innerHTML = ""

        }
    }
    
    const saveGivedPrice = async (e) => {
        e.preventDefault();
    
        let givedPriceInt = parseInt(price);
    
        if (givedPriceInt <= lastMaxPrice) {
          toast.error(
            `You need to enter more than ${lastMaxPrice} if you want to buy this product `
          );
        //   console.log("errror");
        } else {
          if (db) {
            db.collection("finalBuyer").add({
              buyerName: buyer,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              givedPrice: givedPriceInt,
            });
            console.log("registred");
          }
        }
      };
    // console.log(lastMaxPrice);
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5 shadow-lg p-3">
                    <div className="card" style={{ width: "18rem" }}>
                        <p className="text-center">{prd && prd[0].price}</p>
                        <p className="text-center">{lastMaxPrice}</p>
                        <img src={prd && prd[0].image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{prd && prd[0].name}</h5>
                            <p className="card-text"><input type="number" placeholder="enter your price" onChange={(e) => setPrice(e.target.value)} /></p>
                            <input type="submit" className="btn btn-primary mt-2" value="Bid" onClick={saveGivedPrice}/>
                        </div>
                    </div>

                </div>
                <div className="col-md-2">{timer}</div>
                <div className="col-md-4 shadow-lg " >
                    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col" style={{ height: "800px" }}>
                        <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                            <div className="flex items-center space-x-4">
                                <img src={userImg} alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full" />
                                <div className="flex flex-col leading-tight">
                                    <div className="text-2xl mt-1 flex items-center">
                                        <span className="text-gray-700 mr-3">{messages.user}</span>
                                        <span className="text-green-500">
                                            <svg width={10} height={10}>
                                                <circle cx={5} cy={5} r={5} fill="currentColor" />
                                            </svg>
                                        </span>
                                    </div>
                                    <span className="text-lg text-gray-600">Buyer at Benjamin Marketplace</span>
                                </div>
                            </div>
                        </div>
                        <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                            {
                                messages.map(message => {
                                    return <div className="chat-message" key={message.id}>
                                        <div className="flex items-end">
                                            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                                <div><span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600 ">{message.msg}</span></div>
                                            </div>
                                            <span className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 text-white">{message.user.charAt(0)}</span>
                                        </div>
                                    </div>
                                })
                            }

                            <div ref={scrollDown}></div>
                        </div>
                        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                            <div className="relative flex">
                                <span className="absolute inset-y-0 flex items-center">
                                </span>
                                <form action="" onSubmit={sendMessage}>

                                    <input type="text"
                                        onChange={(e) => setMsg(e.target.value)}
                                        id="inp"
                                        placeholder="Write Something" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3" />
                                    <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                                        <button type="submit" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 transform rotate-90">
                                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
