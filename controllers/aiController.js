import express from "express";
import dotenv from 'dotenv';
import OpenAI from "openai";
import { ApiResponse } from "../services/apiResponse.js";
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export const getQuesExplanationByAi = async (req, res) => {
  try {
    const { question, correctAnswer ,question_id} = req.body;
    const prompt = `Question:${question}\n Correct Answer:${correctAnswer}\n Explain in 2-3 simple lines why this is the  correct answer.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 80,
    });
    const explanation = completion.choices[0].message.content.trim();

    res
      .status(200)
      .json(new ApiResponse(true, "AI Explanation failed", {explanation,question_id}));
  } catch (error) {
    console.log("error", error);
    res.status(500).json(false, "AI explanation failed", error);
  }
};
