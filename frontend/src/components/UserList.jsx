import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [tempId, setTempId] = useState(0);
  const [limit, setLimit] = useState(30);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const getUsersAPI = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/users?search_query=${keyword}&limit=${limit}&lastId=${lastId}`
    );
    const newUsers = response.data.result;
    setUsers([...users, ...newUsers]);
    setTempId(response.data.lastId);
    setHasMore(response.data.hasMore);
  };

  useEffect(() => {
    getUsersAPI();
    // console.log(tempId);
  }, [keyword, lastId]);

  const fetchMore = () => {
    setLastId(tempId);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    setUsers([]);
    setLastId(0);
    setKeyword(query);
  };

  return (
    <div className="container mt-5">
      <div className="columns">
        <div className="column is-centered">
          <form onSubmit={handleSearch}>
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  type="text"
                  className="input"
                  placeholder="Find something here ..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="control">
                <button type="submit" className="button is-info">
                  Search
                </button>
              </div>
            </div>
          </form>
          <InfiniteScroll
            dataLength={users.length}
            next={fetchMore}
            hasMore={hasMore}
            loader={<h4>Loading ....</h4>}
          >
            <table className="table is-striped is-bordered is-fullwidth mt-2">
              <thead>
                <tr>
                  <th>No</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}
