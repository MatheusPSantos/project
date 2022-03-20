import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { logout, userIsLogged } from "../utils/auth";

export default function Header() {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState();

  useEffect(() => {
    userIsLogged().then(res => {
      res ? setIsLogged(res) : setIsLogged(false);
    });
  }, []);


  function logoutUser() {
    logout();
    router.push("/");
  }

  return <header className="header">
    <div className="container">
      <div className="row justify-content-between">
        <p className="col-3">To do list</p>

        {
          isLogged ? <div className="col-2">
            <button type="button" className="btn btn-outline-primary" onClick={logoutUser}>
              Log out
            </button>
          </div>
            : <></>
        }
      </div>
    </div>
  </header>
}