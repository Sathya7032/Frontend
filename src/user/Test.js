import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Divider, Paper, Typography, Button } from '@mui/material';
import Base1 from '../user/Base1';

const Test = () => {
    const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [correctCount, setCorrectCount] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("authTokens");

    let user_id = null;
    if (token) {
        const decode = jwtDecode(token);
        user_id = decode.user_id;
    }

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`${baseUrl}/questions/`);
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleAnswerChange = (questionId, optionId) => {
        setSelectedAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: optionId,
        }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const results = Object.keys(selectedAnswers).map(questionId => {
                const selectedOptionId = selectedAnswers[questionId];
                const question = questions.find(q => q.id === parseInt(questionId));
                const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
                const isCorrect = selectedOption.is_correct;

                return {
                    user: user_id,
                    question: questionId,
                    selected_option: selectedOptionId,
                    correct: isCorrect,
                };
            });

            const responses = await Promise.all(results.map(result => axios.post(`${baseUrl}/results/`, result)));

            const correctAnswers = responses.filter(response => response.data.correct);
            setCorrectCount(correctAnswers.length);

            setResults(responses.map(response => response.data));
            alert(`Your answers have been submitted! You got ${correctAnswers.length} out of ${responses.length} correct.`);
        } catch (error) {
            console.error('Error submitting results:', error);
            alert('An error occurred while submitting your answers. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Base1>
            <div style={{ padding: 20 }}>
                <Typography
                    variant="h4"
                    color="primary"
                    style={{ textAlign: "center", fontWeight: "bolder", marginBottom: 20 }}
                >
                    Test
                </Typography>
                {correctCount !== null && (
                    <Typography variant="h6" style={{ textAlign: "center", marginTop: "20px", color: 'tomato' }}>
                        You got {correctCount} out of {questions.length} correct.
                    </Typography>
                )}
                {questions.map((question, index) => (
                    <div key={index} style={{ marginBottom: 20 }}>
                        <Paper style={{ padding: 20 }}>
                            <Typography style={{marginBottom: 20}}>{index + 1}. {question.text}</Typography>
                            <Divider/>
                            {question.options.map(option => (
                                <div key={option.id} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name={`question-${question.id}`}
                                        value={option.id}
                                        onChange={() => handleAnswerChange(question.id, option.id)}
                                        checked={selectedAnswers[question.id] === option.id}
                                    />
                                    <label className="form-check-label">{option.text}</label>
                                </div>
                            ))}

                        </Paper>


                    </div>
                ))}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{ marginTop: 20 }}
                >
                    Submit Answers
                </Button>
                <Divider style={{ margin: "20px 0" }} />


            </div>
        </Base1>
    );
};

export default Test;