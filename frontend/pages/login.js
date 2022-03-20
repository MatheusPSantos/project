import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import api from "../providers/api";
import { userIsLogged } from "../utils/auth";

export default function Login() {
  const router = useRouter();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  useEffect(async () => {
    if (await userIsLogged()) {
      router.push("/dashboard");
    }
  }, []);

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      console.log(loginEmail, loginPassword);

      const { data } = await api.get("/user", {
        params: {
          email: loginEmail,
          password: loginPassword
        }
      });

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.data));
        router.push("/");
        return;
      }

      return alert("User does not exist or crendentials are wrong.");
    } catch (error) {
      console.error(error.message);
      return alert(error.message);
    }
  }

  return <>
    <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label
          htmlFor="email"
          className="form-label"
        >
          Email address
        </label>
        <input
          required
          type="email"
          className="form-control"
          id="email" aria-
          describedby="emailHelp"
          onChange={(e) => setLoginEmail(e.target.value)}
        />

        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>

      <div className="mb-3">
        <label
          htmlFor="password"
          className="form-label">
          Password
        </label>
        <input
          required
          type="password"
          className="form-control"
          id="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label
          className="form-check-label"
          htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>

      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  </>
}