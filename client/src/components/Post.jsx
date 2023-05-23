/* eslint-disable indent */
import React, { useState } from 'react';
import { IoImageOutline, IoCloseOutline } from 'react-icons/io5';
import { HiOutlineGif } from 'react-icons/hi2';
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineUnorderedList,
} from 'react-icons/ai';
import { BsEmojiSmile } from 'react-icons/bs';
import { useSession } from 'next-auth/react';

import { BiCalendar, BiMap } from 'react-icons/bi';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { createTweet } from '../../lib/tweets';

const Post = ({ addTweets }) => {
  const [tweetText, setTweetText] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [files, setFiles] = useState([]);
  const { data: session } = useSession();

  const handleTweetChange = (event) => {
    setTweetText(event.target.value);
  };

  const handleTweetSubmit = async (event) => {
    event.preventDefault();
    console.log('Texto del tweet:', tweetText.length);
    let img = null;
    if (files.length !== 0) {
      img = URL.createObjectURL(files[0].file);
    }

    if (tweetText.length !== 0 || files.length !== 0) {
      const tweet = {
        content: tweetText,
        hashtags: ['Tweet'],
        media: img
      };
      const result = await createTweet(tweet);
      addTweets(prevState => (
        [result, ...prevState]
      ));
      setTweetText('');
      setFiles([]);
      setUbicacion('');
    }
  };

  return (
    <div className="w-full h-auto border-b border-black/5 dark:border-white/20 dark:bg-black dark:text-[#e7e9ea]">
      <div className="p-4">
        <div className="flex w-full items-start">
          <div className="flex-shrink-0">
            <img
              className="w-12 h-12 rounded-full"
              src={session?.user?.image}
              alt="Profile"
            />
          </div>
          <div className="w-full ml-3 flex-row ">
            <textarea
              className="w-full resize-none focus:outline-none bg-transparent dark:text-white my-2 text-xl"
              placeholder="¿Qué está pasando?"
              value={tweetText}
              onChange={handleTweetChange}
            />

            <div className="grid grid-cols-2 gap-2 max-h-fit w-auto py-2">
              {files.map((file) => (
                <div className="relative" key={file.id}>
                  <IoCloseOutline
                    onClick={() =>
                      setFiles(files.filter((el) => el.id !== file.id))
                    }
                    className="absolute z-5 m-1 p-2 top-0 left-0 cursor-pointer hover:bg-black/60 text-white bg-black/70 backdrop-blur-lg rounded-full h-9 w-9"
                    title="Eliminar"
                  />
                  {file.file.type.startsWith('image/') ? (
                    <Image
                      width={250}
                      height={320}
                      key={file.id}
                      src={URL.createObjectURL(file.file)}
                      alt={file.file.name}
                      className="max-h-80 w-full object-cover rounded-2xl "
                    />
                  ) : (
                    <video
                      key={file.name}
                      src={URL.createObjectURL(file.file)}
                      alt={file.name}
                      className="max-h-80 w-full object-cover rounded-2xl "
                      controls
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="w-full justify-end border-b border-black/5 dark:border-white/20 my-2 py-2">
              {ubicacion.length ? (
                <span
                  onClick={() => setUbicacion('')}
                  className="inline-flex items-center cursor-pointer bg-[#1C9BEF]/20 hover:bg-[#ff1100]/30 rounded-full hover:text-[#ff1100]/80 text-[#1C9BEF] py-1 px-2 font-semibold"
                >
                  {' '}
                  <BiMap className="mr-1" title="Etiquetar ubicacion" />{' '}
                  {ubicacion}
                </span>
              ) : (
                ''
              )}
            </div>
            <div className="w-full flex flex-row justify-between ">
              <div className="w-full flex items-center gap-1">
                <FileUploader files={files} setFiles={setFiles} />
                {/* <div className='flex items-center align-middle space-x-1 cursor-pointer text-[#1C9BEF] group' >
                                    <IoImageOutline className='icons group-hover:bg-[#1C9BEF]/10' title='Fotos y Videos' />
                                </div> */}
                <div className="flex items-center align-middle space-x-1 cursor-pointer text-[#1C9BEF] group">
                  <HiOutlineGif
                    className="icons group-hover:bg-[#1C9BEF]/10 "
                    title="Gif"
                  />
                </div>
                <div className="flex items-center align-middle space-x-1 cursor-pointer text-[#1C9BEF] group">
                  <AiOutlineUnorderedList
                    className="icons group-hover:bg-[#1C9BEF]/10 "
                    title="Encuesta"
                  />
                </div>
                <div className="flex items-center align-middle space-x-1 cursor-pointer text-[#1C9BEF] group">
                  <BsEmojiSmile
                    className="icons group-hover:bg-[#1C9BEF]/10 "
                    title="Emoji"
                  />
                </div>
                <div className="flex items-center align-middle space-x-1 cursor-pointer text-[#1C9BEF] group">
                  <BiCalendar
                    className="icons group-hover:bg-[#1C9BEF]/10 "
                    title="Programacion"
                  />
                </div>
                <Ubicacion setUbicacion={setUbicacion} />
              </div>
              <button
                className="bg-[#1d9bf0] text-white font-semibold px-4 rounded-full hover:bg-[#1a8cd8] disabled:bg-[#1a8cd8] disabled:cursor-not-allowed disabled:opacity-70 transition-opacity duration-400"
                type="submit"
                disabled={!tweetText.length && !files.length}
                onClick={handleTweetSubmit}
              >
                Twittear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// const CreatePost = () => {
//     const [text, setText] = useState('');
//     const [searchWord, setSearchWord] = useState('');
//     const [replaceWord, setReplaceWord] = useState('');

//     const handleTextChange = (event) => {
//         setText(event.target.textContent);
//     };

//     const handleSearchInputChange = (event) => {
//         setSearchWord(event.target.value);
//     };

//     const handleReplaceInputChange = (event) => {
//         setReplaceWord(event.target.value);
//     };

//     const replaceText = () => {
//         if (!searchWord) {
//             return text;
//         }
//         const regex = new RegExp(searchWord, 'gi');
//         return text.replace(regex, `<a class="text-red-400" >${replaceWord}</a>`);
//     };

//     return (
//         <div>
//             <div
//                 contentEditable={true}
//                 onInput={handleTextChange}
//                 placeholder="Texto original"
//                 style={{ border: '1px solid #ccc', padding: '10px' }}
//             ></div>
//             <input
//                 type="text"
//                 value={searchWord}
//                 onChange={handleSearchInputChange}
//                 placeholder="Palabra a buscar"
//             />
//             <input
//                 type="text"
//                 value={replaceWord}
//                 onChange={handleReplaceInputChange}
//                 placeholder="Palabra de reemplazo"
//             />
//             <div dangerouslySetInnerHTML={{ __html: replaceText() }}></div>
//         </div>
//     );
// }

const FileUploader = ({ files, setFiles }) => {
  const onDrop = (acceptedFiles) => {
    // Limit the number of files to 2
    if (files.length === 2)
      return alert('Solo se puede un max 2 fotos y videos');

    console.log(acceptedFiles);

    const updatedFiles = [
      ...files,
      ...acceptedFiles.slice(0, 2 - files.length).map((element) => ({
        file: element,
        id: Math.floor(Date.now() + (Math.random() * 100 + 1)),
      })),
    ];
    setFiles(updatedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="flex items-center align-middle space-x-1 cursor-pointer text-[#1C9BEF] group"
      {...getRootProps()}
    >
      <input {...getInputProps()} accept="image/*,video/*" multiple={true} />
      <IoImageOutline
        className="icons group-hover:bg-[#1C9BEF]/10"
        title="Fotos y Videos"
      />
    </div>
  );
};

const Ubicacion = ({ setUbicacion }) => {
  const geolocationAPI = navigator.geolocation;
  const getUserCoordinates = async () => {
    if (!geolocationAPI) {
      console.log('Geolocation API is not available in your browser!');
    } else {
      geolocationAPI.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
          )
            .then((res) => res.json())
            .then((prueba) =>
              setUbicacion(`${prueba.address.city}, ${prueba.address.country}`)
            );
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
  };
  //
  return (
    <div
      onClick={getUserCoordinates}
      className="flex items-center align-middle space-x-1 cursor-pointer text-[#1C9BEF] group"
    >
      <BiMap
        className="icons group-hover:bg-[#1C9BEF]/10 "
        title="Etiquetar ubicacion"
      />
    </div>
  );
};

export default Post;
