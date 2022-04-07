import axios from "axios";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { useEffect, useState } from "react";

type User = {
  name: string;
};

type UserPageProps = {
  users: User[];
  date: string;
};

const UsersStaticPage: NextPage<UserPageProps> = (props) => {
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("https://my-json-server.typicode.com/MiqueiasCS/nextjs-test/users")
  //     .then((response) => {
  //       console.log(response);
  //       setUsers(response.data);
  //     });
  // }, []);

  const { users, date } = props;

  return (
    <div>
      <h1>Users static - {date} </h1>
      <ul>
        {users.map((user: any, key) => (
          <li key={key}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersStaticPage;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get(
    "https://my-json-server.typicode.com/MiqueiasCS/nextjs-test/db"
  );

  const users = data.users;

  return {
    props: {
      users,
      date: new Date().getTime(),
    },
    revalidate: 10,
  };
};
// /users/static -> 10s
// /users/static/[id]
