import { useFollowUserMutation, useGetAllUsersQuery, useGetMyProfileQuery, useUnFollowUserMutation } from "@/redux/services/usersApi";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
const { default: Image } = require("next/image");
const { default: Link } = require("next/link");

function QuienSeguir() {
  const { data: session } = useSession();
  const loggedInUserId = session?.user?._id;
  const userActual = useGetMyProfileQuery(session?.token);
  const [randomData, setRandomData] = useState([]);
  const { data, isLoading } = useGetAllUsersQuery();
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    if (data) {
      const filteredData = data.filter((user) => user._id !== loggedInUserId);
      const randomUsers = [...filteredData]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      setRandomData(randomUsers);
    }
  }, [data, loggedInUserId]);

  useEffect(() => {
    if (userActual.data?.following) {
      const followingIds = userActual.data.following.map((user) => user._id);
      setFollowing(followingIds);
    }
  }, [userActual.data?.following]);

  const [unfollowUser] = useUnFollowUserMutation();
  const [followUser] = useFollowUserMutation();

  const onClickFollowUser = async (id) => {
    const res = await followUser({ userId: id, token: session.token });
    console.log(res);
    if (res.data) {
      setFollowing((prevFollowing) => [...prevFollowing, id]);
    }
  };

  const onClickUnFollowUser = async (id) => {
    const res = await unfollowUser({ userId: id, token: session.token });
    if (res.data) {
      setFollowing((prevFollowing) => prevFollowing.filter((userId) => userId !== id));
    }
    console.log(res);
  };

  if (userActual.isFetching) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="h-[330px] w-[330px] rounded-md dark:bg-[#16181C]">
        <h2 className="ml-3 mt-2 text-[23px] font-semibold dark:text-white">
          A quién seguir
        </h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          randomData.map((user) => (
            <div key={user._id}>
              <div className="flex flex-row items-center gap-2 p-4">
                <Image
                  src={user.image}
                  width={50}
                  height={100}
                  alt="Avatar"
                  className="rounded-full"
                  unoptimized
                />
                <div className="grow">
                  <h3 className="font-bold dark:text-white">{user.name}</h3>
                  <p className="dark:text-gray-400 text-xs">
                    @{user.email.split("@")[0]}
                  </p>
                </div>
                {following.includes(user._id) ? (
                  <button onClick={() => onClickUnFollowUser(user._id)} className="ml-2 h-9 w-[75px] rounded-full bg-red-500 text-sm font-bold text-white">
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => onClickFollowUser(user._id)}
                    className="ml-2 h-9 w-[65px] rounded-full bg-white text-sm font-bold dark:text-black"
                  >
                    Seguir
                  </button>
                )}
              </div>
            </div>
          ))
        )}
        <Link href="/explore" className="text-md ml-3 text-blue-500">
          Mostrar más
        </Link>
      </div>
    </>
  );
}

export default QuienSeguir;
