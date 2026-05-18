
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SymptomResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const { symptoms } = location.state || {};

  if (!symptoms) {
    return (
      <div className="container py-8">
        <p className="text-lg">No symptoms provided.</p>
        <Button className="mt-4" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    );
  }

  const openChatbot = () => {
    navigate("/chatbot", { state: { initialMessage: symptoms } });
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Symptom Analysis</h1>

      <Card>
        <CardHeader>
          <CardTitle>Your Symptoms</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="whitespace-pre-line">{symptoms}</p>
        </CardContent>
      </Card>

      <Button className="mt-6" onClick={openChatbot}>
        Ask AI Medical Chatbot
      </Button>
    </div>
  );
}