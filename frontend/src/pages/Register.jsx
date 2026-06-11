import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import Button from "../components/Button";
import Input from "../components/Input";
import { Container } from "../components/Container";
import BrandLogo from "../components/BrandLogo";
import Alert from "../components/Alert";
import "./AuthPages.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
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
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Error registering");
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
            <h1>Create Account</h1>
            <p>Join our study assistant community</p>
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
              label="Full Name"
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              icon={FiUser}
              required
              fullWidth
            />

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
              placeholder="Create a strong password"
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
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <p className="auth-footer">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Sign in here
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}

export default Register;
