import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiBook, FiArrowRight } from "react-icons/fi";
import API from "../services/api";
import Header from "../components/Header";
import { Container, Grid } from "../components/Container";
import { Card, CardHeader, CardBody } from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import Alert, { Badge } from "../components/Alert";
import { LoadingContainer } from "../components/Loading";
import "./Dashboard.css";

function Dashboard() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const res = await API.get("/subjects", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSubjects(res.data);
    } catch (err) {
      setError("Failed to load subjects");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const createSubject = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter a subject name");
      return;
    }

    try {
      setCreating(true);
      await API.post(
        "/subjects",
        { name },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setName("");
      setError("");
      await fetchSubjects();
    } catch (err) {
      setError(err.response?.data?.msg || "Error creating subject");
      console.log(err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="dashboard">
      <Header title="Study Assistant" />

      <Container size="lg" className="dashboard-content">
        <div className="dashboard-header fade-in">
          <div>
            <h1>Your Subjects</h1>
            <p>Manage and organize your study materials</p>
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

        <div className="dashboard-layout">
          <aside className="dashboard-sidebar">
            <Card className="create-subject-card">
              <CardHeader>
                <h3>Create New Subject</h3>
              </CardHeader>
              <CardBody>
                <form onSubmit={createSubject} className="create-form">
                  <Input
                    type="text"
                    placeholder="Enter subject"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    icon={FiBook}
                    fullWidth
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    icon={FiPlus}
                    loading={creating}
                  >
                    {creating ? "Creating..." : "Create Subject"}
                  </Button>
                </form>
              </CardBody>
            </Card>
          </aside>

          <section className="subjects-section">
            <div className="section-header">
              <h2>Subjects ({subjects.length})</h2>
              {subjects.length > 0 && (
                <Badge variant="primary">{subjects.length}</Badge>
              )}
            </div>

            <LoadingContainer loading={loading}>
              {subjects.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📚</div>
                  <h3>No Subjects Yet</h3>
                  <p>Create your first subject to get started with organizing your notes</p>
                </div>
              ) : (
                <Grid cols={3} gap={24}>
                  {subjects.map((sub) => (
                    <Card
                      key={sub._id}
                      hoverable
                      className="subject-card"
                      onClick={() => navigate(`/notes/${sub._id}`)}
                    >
                      <CardHeader>
                        <div className="subject-icon">📖</div>
                        <h4>{sub.name}</h4>
                      </CardHeader>
                      <CardBody>
                        <p className="subject-hint">
                          Click to open and manage notes
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          fullWidth
                          icon={FiArrowRight}
                          iconPosition="right"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/notes/${sub._id}`);
                          }}
                        >
                          View Notes
                        </Button>
                      </CardBody>
                    </Card>
                  ))}
                </Grid>
              )}
            </LoadingContainer>
          </section>
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
