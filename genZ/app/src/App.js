import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
function App() {
  const [data, setData] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const genAi = new GoogleGenerativeAI(
    "AIzaSyA9ibxP-EBKMCHCUEhYv-DSiksjqBvSx18"
  );
  const model = genAi.getGenerativeModel({ model: "gemini-pro" });

  const getOutput = async (prompt) => {
    try {
      let result = await model.generateContent(prompt);
      let response = await result.response;
      console.log(response.text());
      setLoading(false);
      setData(response.text());
    } catch (error) {
      setData(error + "- (Error thrown by Generative AI)");
      console.log(error);
    }
  };

  const enter = (e) => {
    setLoading(true);
    e.preventDefault();
    getOutput(prompt);
    setPrompt("");
  };

  return (
    <div
      class="rounded-lg bg-white h-[85vh] border bg-card text-card-foreground shadow-sm w-full max-w-3xl mx-auto my-[50px]"
      data-v0-t="card"
    >
      <div class="flex flex-col h-[100%] justify-between">
        <div class="flex flex-col justify-end p-6 space-y-4 max-h-[90%]">
          <div class="flex flex-col space-y-2  h-[100%]">
            <div>Ask Something?</div>
            {!loading && data ? (
              <div class="rounded-xl bg-gray-100 p-4 dark:bg-gray-800 max-h-[100%] overflow-y-auto">
                <p class="text-xl text-white bg-black rounded-md p-2 ">
                  {data}
                </p>
              </div>
            ) : loading ? (
              <div className="animate-pulse">Thinking...</div>
            ) : (
              <></>
            )}
          </div>
        </div>
        {!data && (
          <div className="text-8xl flex justify-center items-center h-[100%] text-gray-200">
            GenZ
          </div>
        )}

        <div class="flex items-center p-4">
          <form class="flex w-full space-x-2" onSubmit={enter}>
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
              placeholder="Type your message..."
            />
            <button
              class="bg-gray-900 hover:bg-black/80 text-white rounded-md px-3 py-2 text-sm font-semibold shadow-sm"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
