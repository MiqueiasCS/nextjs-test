import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";

type User = {
  name: string;
};

type UserPageProps = {
  users: User[];
};

const UsersPage: NextPage<UserPageProps> = (props) => {
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("https://my-json-server.typicode.com/MiqueiasCS/nextjs-test/users")
  //     .then((response) => {
  //       console.log(response);
  //       setUsers(response.data);
  //     });
  // }, []);

  const { users } = props;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user: any, key) => (
          <li key={key}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get(
    "https://my-json-server.typicode.com/MiqueiasCS/nextjs-test/db"
  );

  const users = data.users;

  return {
    props: {
      users,
    },
  };
};
