import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiMessageCircle, FiPlus, FiTrash2 } from "react-icons/fi";
import API from "../services/api";
import Header from "../components/Header";
import { Container } from "../components/Container";
import { Card, CardHeader, CardBody } from "../components/Card";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { LoadingContainer } from "../components/Loading";
import "./NotesPage.css";

function NotesPage() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [subjectName, setSubjectName] = useState("");

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/notes/${subjectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotes(res.data);
    } catch (err) {
      setError("Failed to load notes");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Please enter a note");
      return;
    }

    try {
      setCreating(true);
      const res = await API.post(
        "/notes",
        { subjectId, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNotes((currentNotes) => [res.data, ...currentNotes]);
      setContent("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create note");
      console.log(err);
    } finally {
      setCreating(false);
    }
  };

  const deleteNote = async (noteId) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      await API.delete(`/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotes((currentNotes) => currentNotes.filter((note) => note._id !== noteId));
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete note");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotes();
    setSubjectName(localStorage.getItem("currentSubject") || "Subject");
  }, [subjectId]);

  return (
    <div className="notes-page">
      <Header title="Study Assistant" />

      <Container size="lg" className="notes-content">
        <div className="notes-header fade-in">
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <FiArrowLeft size={20} />
            Back to Subjects
          </button>
          <div>
            <h1>My Notes</h1>
            <p className="subject-label">{subjectName}</p>
          </div>
        </div>

        {error && (
          <Alert
            type="error"
            message={error}
            onClose={() => setError("")}
            dismissible
          />
        )}

        <div className="notes-layout">
          <aside className="notes-sidebar">
            <Card className="add-note-card">
              <CardHeader>
                <h3>Add New Note</h3>
              </CardHeader>
              <CardBody>
                <form onSubmit={addNote} className="add-note-form">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your note here... (You can use markdown formatting)"
                    className="note-textarea"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    icon={FiPlus}
                    loading={creating}
                  >
                    {creating ? "Creating..." : "Add Note"}
                  </Button>
                </form>
              </CardBody>
            </Card>
          </aside>

          <section className="notes-section">
            <h2>Notes ({notes.length})</h2>

            <LoadingContainer loading={loading}>
              {notes.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📝</div>
                  <h3>No Notes Yet</h3>
                  <p>Create your first note to start organizing your thoughts and study materials</p>
                </div>
              ) : (
                <div className="notes-list">
                  {notes.map((note, index) => (
                    <Card key={note._id} className="note-card hover-lift">
                      <CardHeader>
                        <div className="note-number">#{index + 1}</div>
                        <p className="note-date">
                          {new Date(note.createdAt || Date.now()).toLocaleDateString()}
                        </p>
                      </CardHeader>
                      <CardBody>
                        <p className="note-content">{note.content}</p>
                        <div className="note-actions">
                          <Button
                            variant="primary"
                            size="sm"
                            icon={FiMessageCircle}
                            onClick={() => navigate(`/chat/${note._id}`)}
                          >
                            Ask AI
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            icon={FiTrash2}
                            onClick={() => deleteNote(note._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              )}
            </LoadingContainer>
          </section>
        </div>
      </Container>
    </div>
  );
}

export default NotesPage;
