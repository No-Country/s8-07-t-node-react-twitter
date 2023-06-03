import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { BiMessageRounded } from 'react-icons/bi'
import { HiBadgeCheck } from 'react-icons/hi'
import { FiShare } from 'react-icons/fi'
import { SlOptions } from 'react-icons/sl'
import { IoStatsChart } from 'react-icons/io5'
import { IoIosLock } from 'react-icons/io'

import { getTimeAgo } from '../../utils/formateadorTiemposRelativos'
import Likes from './Likes'
import Retweet from './Retweet'

const Tweet = (props) => {
  const { id, content, timestamp = 0, author, comments, createdAt, __v, images } = props
  const formatNum = (num) => (num === 0 ? "" : num);

  return (
        <div key={id} className='h-auto w-full flex flex-row p-4 items-start cursor-pointer border-b dark:border-white/20 border-black/5 bg-white dark:bg-black dark:hover:bg-white/5 hover:bg-black/5 text-[#536471] dark:text-[#e7e9ea]' >
            {
                (author?.image) ? (
                    <Image src={author.image} alt={author.name} width={64} height={64} className='h-12 w-12 rounded-full mr-4 hover:opacity-90' />)
                  : (
                        <svg className="text-gray-200 w-14 h-14 dark:text-gray-700" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
                    )
            }
            <div className="w-full flex flex-col gap-1 text-[#536471] dark:bg-transparent" >
                <div className='flex flex-row items-start group gap-1 text-lg w-full' >
                    <h4 className="ml-2 inline-flex items-center align-middle font-bold text-black dark:text-[#e7e9ea] group-hover:underline" >{author?.name}
                        {
                            author?.private && <IoIosLock className='text-black dark:text-white ml-1' title='Cuenta verificada' />
                        }
                        {
                            author?.confirmed && <HiBadgeCheck className='text-[#1d9bf0] ml-1' title='Cuenta verificada' />
                        }
                    </h4>
                    <span>{'@' + (author?.username || author?.email.split("@")[0])}</span>
                    {
                        (timestamp || createdAt) && <TimeAgo timestamp={timestamp || createdAt} />
                    }
                </div>
                <p className='ml-2 dark:text-white w-[90%]' >{content}</p>
                {
                    images.length ? (
                        <div className='max-w-fit max-h-fit py-2'>
                            <img src={images[0] || "https://pbs.twimg.com/media/FkWOB7-WQAAPLaU?format=jpg&name=small"} className="object-fit rounded-3xl" alt="postImg" />
                        </div>
                    ) : null
                }
                {/* {retweets.length !== 0 && (
                    <div className="flex flex-col max-w-fit rounded-xl border border-black/5 hover:bg-black/10 overflow-hidden">
                        <div className="flex flex-col items-start p-3 gap-2 text-[#536471] dark:text-[#e7e9ea]" >
                            <div className='flex flex-row items-start group gap-2 text-lg w-full' >
                                <img src="https://pbs.twimg.com/profile_images/1612291632342122499/h2jKhVoh_400x400.jpg" alt="userImg" className='h-8 w-8 rounded-full bg-black hover:opacity-90' />
                                <h4 className="inline-flex items-center align-middle font-bold text-black dark:text-white group-hover:underline" >Leo Messi <HiBadgeCheck className='text-[#1d9bf0] ml-1' title='Cuenta verificada' /> </h4>
                                <span>@leomessisite</span>
                                <TimeAgo timestamp={timestamp} />
                            </div>
                            <p>{retweets[0].content}</p>
                        </div>
                        <div className='max-w-fit max-h-[500px]'>
                            <img src="https://pbs.twimg.com/media/FkWOB7-WQAAPLaU?format=jpg&name=small" className="object-fit" alt="postImg" />
                        </div>
                    </div>
                )} */}
                <div className='max-w-fit flex items-center gap-2' >
                    <div className='flex items-center align-middle space-x-1 cursor-pointer hover:text-[#1C9BEF] group' >
                        <BiMessageRounded className='icons group-hover:bg-[#1C9BEF]/10' title='Responder' />
                        <p className='text-sm' >{formatNum(comments.length)}</p>
                    </div>
                    <Retweet {...props}/>
                    <Likes {...props}/>
                    <div className='flex items-center align-middle space-x-1 cursor-pointer hover:text-[#1C9BEF] group' >
                        <IoStatsChart className='icons group-hover:bg-[#1C9BEF]/10' title='Ver' />
                        <p className='text-sm' >{__v}</p>
                    </div>
                    <div className='flex items-center align-middle space-x-1 cursor-pointer hover:text-[#1d9bf0] group' >
                        <FiShare className='icons group-hover:bg-[#1d9bf0]/10' title='Compartir' />
                    </div>
                </div>
            </div>
            <div className='w-auto flex items-center align-middle -ml-5 cursor-pointer hover:text-[#1d9bf0] group' >
                <SlOptions className='icons w-10 h-10 group-hover:bg-[#1C9BEF]/10' title='Mas opciones' />
            </div>
        </div>
  )
}

const TimeAgo = ({ timestamp, styleds = "" }) => {
  const [time, setTime] = useState(getTimeAgo(timestamp))

  useEffect(() => {
    const newInterval = setInterval(() => {
      setTime(getTimeAgo(timestamp))
    }, 5000);

    return () => {
      clearInterval(newInterval);
    };
  }, [time]);

  return (
        <span className={styleds}>{` · ${time}`}</span>
  )
}

export default Tweet
