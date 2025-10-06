import {
  Container,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Button,
} from "@mui/material";
import React, { useState } from "react";

const App = () => {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copy, setCopy] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        "http://localhost:8080/api/email/generate",

        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emailContent, tone }),
        }
      );
      // console.log("Response:", response.text);
      const data = await response.text();
      setGeneratedReply(
        typeof data === "string" ? data : JSON.stringify(data)
      );
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
      setCopy(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component={"h1"} gutterBottom>
        Email Reply Generator
      </Typography>
      <Box sx={{ mx: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Email Content"
          value={emailContent || ""}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone}
            label={"Tone (Optional)"}
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : "Generate Reply"}
        </Button>
      </Box>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {{ error }}
        </Typography>
      )}
      {generatedReply && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Generated Reply:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={generatedReply || " "}
            inputProps={{ readOnly: true }}
          />

          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={async () => {
              await navigator.clipboard.writeText(generatedReply);
              setCopy(true);
            }}
          >
            {copy ? "Copied" : "Copy To Clipboard"}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default App;
