import React from "react";
import { Button } from "primereact/button";

const Table = () => {
  /* const [users, setUsers] = useState();

    const getDataUsers = useCallback(async () => {
      const response = await getAllUsers();
      setUsers(response);
      console.log(users);
    }, []);
  
    useEffect(() => {
      getDataUsers();
    }, [getDataUsers]); */
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Button /* onClick={getDataUsers} */ />
    </div>
  );
};

export default Table;
