import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiSend, FiArrowLeft } from "react-icons/fi";
import Header from "../components/Header";
import { Container } from "../components/Container";
import { Card, CardBody } from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import Alert from "../components/Alert";
import { Spinner } from "../components/Loading";
import { Badge } from "../components/Alert";
import API from "../services/api";
import "./ChatPage.css";

function ChatPage() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMessage = { role: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);
    setError("");

    try {
      const res = await API.post(
        "/chat",
        {
          noteId,
          question,
        }
      );

      const aiMessage = { role: "ai", text: res.data.answer };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to get AI response. Please try again.");
      console.log(err);
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-page">
      <Header title="Study Assistant" />

      <Container size="lg" className="chat-container">
        <div className="chat-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FiArrowLeft size={20} />
            Back
          </button>
          <div>
            <h1>AI Tutor</h1>
            <p>Ask questions about your notes</p>
          </div>
        </div>

        <Card className="chat-card">
          {error && (
            <Alert
              type="error"
              message={error}
              onClose={() => setError("")}
              dismissible
            />
          )}

          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="chat-empty">
                <div className="chat-empty-icon">💬</div>
                <h3>Start Your Study Session</h3>
                <p>Ask any questions about your notes and get instant AI-powered answers</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`message message-${msg.role}`}>
                  <div className="message-avatar">
                    {msg.role === "user" ? "👤" : "🤖"}
                  </div>
                  <div className="message-content">
                    <Badge variant={msg.role === "user" ? "primary" : "success"} size="sm">
                      {msg.role === "user" ? "You" : "AI"}
                    </Badge>
                    <p className="message-text">{msg.text}</p>
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="message message-ai">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <Badge variant="success" size="sm">AI</Badge>
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <CardBody className="chat-input-area">
            <form onSubmit={sendMessage} className="chat-form">
              <Input
                type="text"
                placeholder="Ask a question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={loading}
                fullWidth
                icon={FiSend}
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                icon={FiSend}
                loading={loading}
                disabled={loading || !question.trim()}
              >
                Send
              </Button>
            </form>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default ChatPage;
