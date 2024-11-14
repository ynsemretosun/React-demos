import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import VerticalFormRow from "../../ui/VerticalFormRow";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import Spinner from "../../ui/Spinner";

function LoginForm() {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("perspective");
  const { isLogging, user, login } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <VerticalFormRow label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLogging}
        />
      </VerticalFormRow>
      <VerticalFormRow label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLogging}
        />
      </VerticalFormRow>
      <VerticalFormRow>
        <Button size="large" disabled={isLogging}>
          {isLogging ? <SpinnerMini /> : "Log in"}
        </Button>
      </VerticalFormRow>
    </Form>
  );
}

export default LoginForm;
