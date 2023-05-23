import Post from '@/components/Post'
import Tweet from '@/components/Tweet'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { initialState } from './../../../data/tweets';
import Head from 'next/head';
import { getAllTweets } from '../../../lib/tweets';
function Home() {
    const [isSelected, setIsSelected] = useState('para-ti')
    const [allTweets, setAllTweets] = useState(initialState)
    const [auxAllTweets, setAuxAllTweets] = useState(initialState)

    const filterTweets = (payload) => {
        setAllTweets(auxAllTweets.filter(tweet => payload === "siguiendo" ? tweet.author.username !== 'Cristiano' : tweet.author.username !== ''))
    }
    const addTweets = (payload) => {
        setAuxAllTweets([payload, ...auxAllTweets])
        setAllTweets([payload, ...auxAllTweets])
    }


    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getAllTweets();
          setAllTweets(prevState => (
            [...data, ...prevState]
          ));
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, []);
    useEffect(() => {
        filterTweets(isSelected)
    }, [isSelected])

console.log(allTweets)

    return (
        <>
            <Head>
                <title>Inicio / Twitter</title>
            </Head>
            <Header isSelected={isSelected} setIsSelected={setIsSelected} />
            <Post addTweets={setAllTweets} />
            {
                allTweets.length && allTweets.map((tweet) => (
                    <Tweet key={tweet._id} {...tweet} />
                ))
            }
        </>
    )
}

export default Home

const Header = ({ isSelected, setIsSelected }) => {
    return (
        <div className="sticky bg-white/75 dark:text-[#e7e9ea] dark:bg-black border-b border-black/5 dark:border-white/20 z-10 backdrop-blur-md top-0">
            <div className="flex items-center justify-between px-4 py-3">
                <Link href="/home" >
                    <div>
                        <h2 className="text-xl font-bold">Inicio</h2>
                    </div>
                </Link>
            </div>
            <div className="flex text-[#536471]">
                <div onClick={() => setIsSelected('para-ti')} className={`flex items-center justify-center w-full h-[60px] text-md p-4 ${isSelected === 'para-ti' ? 'font-bold text-black dark:text-[#e7e9ea]' : 'text-gray-500 dark:text-[#536471] font-semibold'}  hover:bg-gray-500 hover:bg-opacity-10 cursor-pointer transition duration-200 ease-in-out`}>
                    <div className={`inline-block text-center border-b-4 ${isSelected === 'para-ti' ? 'border-b-[#1C9CEF]' : 'border-b-transparent'} h-[60px] `}>
                        <div className="my-auto mt-4">Para ti </div>
                    </div>
                </div>
                <div onClick={() => setIsSelected('siguiendo')} className={`flex items-center justify-center w-full h-[60px] text-md  p-4 ${isSelected === 'siguiendo' ? 'font-bold text-black dark:text-[#e7e9ea]' : 'text-gray-500 dark:text-[#536471] font-semibold'}  hover:bg-gray-500 hover:bg-opacity-10 cursor-pointer transition duration-200 ease-in-out`} >
                    <div className={`inline-block text-center border-b-4 ${isSelected === 'siguiendo' ? 'border-b-[#1C9CEF]' : 'border-b-transparent'} h-[60px] `}>
                        <div className="my-auto mt-4">Siguiendo </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
