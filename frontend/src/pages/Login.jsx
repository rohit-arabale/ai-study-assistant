import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import Button from "../components/Button";
import Input from "../components/Input";
import { Container } from "../components/Container";
import BrandLogo from "../components/BrandLogo";
import Alert from "../components/Alert";
import "./AuthPages.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Container size="xs" className="auth-container">
        <div className="auth-content fade-in">
          <BrandLogo size="lg" align="center" className="auth-logo" />

          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your study assistant account</p>
          </div>

          {error && (
            <Alert
              type="error"
              message={error}
              onClose={() => setError("")}
              dismissible
            />
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              icon={FiMail}
              required
              fullWidth
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              icon={FiLock}
              required
              fullWidth
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="auth-footer">
            Don't have an account?{" "}
            <Link to="/register" className="auth-link">
              Sign up here
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}

export default Login;
