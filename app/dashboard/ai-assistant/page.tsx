"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  Mic,
  Bot,
  User,
  // Sparkles,
  Loader2,
  // ChevronDown,
  // ChevronUp,
  // RefreshCw,
  // Lightbulb,
  // Coins,
  // TrendingUp,
  // PiggyBank,
} from "lucide-react";
import aiHelper, { userRequestFromFrontend } from "@/lib/gemini";

import Markdown from "react-markdown";
// import { ITransaction } from "@/models/transaction";

export interface IMessage {
  id: string;
  role: string;
  content: string;
  timestamp: number | Date;
}
// Mock chat history
const initialMessages: IMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Hello! I'm your AI financial assistant. How can I help you today?",
    timestamp: new Date(),
  },
];

// Mock suggested questions
const suggestedQuestions = [
  "How can I save for a house in 5 years?",
  "What's the best way to invest $5,000?",
  "How do I create an emergency fund?",
  "Should I pay off debt or invest first?",
  "How much should I save for retirement?",
  "What are the tax benefits of a 401(k)?",
];

function AIAssistant() {
  const [messages, setMessages] = useState<IMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    (messagesEndRef as any).current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (messageText = input) => {
    if (!messageText.trim()) return;
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date().getTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    let transactionData: any;
    if (selectedTimeRange === "Last Month") {
      const currDate = new Date();
      let startDate = currDate.getTime() - 30 * 24 * 60 * 60 * 1000;

      let endDate = currDate.getTime();
      transactionData = await fetch(
        `/api/transactions?startDate=${startDate}&endDate=${endDate}`
      );

      transactionData = await transactionData.json();
    }
    if (selectedTimeRange === "Last Week") {
      const currDate = new Date();
      let startDate = currDate.getTime() - 30 * 24 * 60 * 60 * 1000;

      let endDate = currDate.getTime();
      transactionData = await fetch(
        `/api/transactions?startDate=${startDate}&endDate=${endDate}`
      );

      transactionData = await transactionData.json();
    }

    // Simulate AI response delay
    setTimeout(() => {
      generateAIResponse({
        userMessage: userMessage,
        transactionData: transactionData,
      });
    }, 1500);
  };

  const generateAIResponse = async (userMessage: any) => {
    let aiResponse = "";

    aiResponse = await aiHelper(userRequestFromFrontend(userMessage));

    const assistantMessage = {
      id: Date.now().toString(),
      role: "assistant",
      content: aiResponse,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp: number) => {
    console.log(timestamp);
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full relative">
      <div className="absolute top-4 right-4 border  bg-gray-100 rounded-md flex gap-4 items-center px-1">
        <p
          className={
            selectedTimeRange === ""
              ? "bg-white rounded-md py-2 px-1 cursor-pointer"
              : "cursor-pointer"
          }
          onClick={() => {
            setSelectedTimeRange("");
          }}
        >
          None
        </p>{" "}
        <p
          className={
            selectedTimeRange === "Last Month"
              ? "bg-white rounded-md py-2 px-1 cursor-pointer"
              : "cursor-pointer"
          }
          onClick={() => {
            setSelectedTimeRange("Last Month");
          }}
        >
          Last Month
        </p>
        <p
          className={
            selectedTimeRange === "Last Week"
              ? "bg-white rounded-md py-2 px-1 cursor-pointer"
              : " cursor-pointer"
          }
          onClick={() => {
            setSelectedTimeRange("Last Week");
          }}
        >
          Last Week
        </p>
      </div>
      <Card className="md:col-span-2 flex flex-col h-[80vh]">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            <Bot className="mr-2 h-5 w-5 text-primary" />
            Financial AI Assistant
          </CardTitle>
          <CardDescription>
            Ask me anything about your finances, investments, or financial goals
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow overflow-y-auto pb-0">
          <div className="space-y-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[80%] ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full ${
                      message.role === "user"
                        ? "bg-primary ml-2"
                        : "bg-muted mr-2"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-4 w-4 text-primary-foreground" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>

                  <div>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="whitespace-pre-wrap markdown-container">
                        <Markdown>{message.content}</Markdown>
                      </div>
                    </div>
                    <div
                      className={`mt-1 text-xs text-muted-foreground ${
                        message.role === "user" ? "text-right" : ""
                      }`}
                    >
                      {formatTimestamp(message.timestamp as number)}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex flex-row">
                  <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-muted mr-2">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-lg px-4 py-2 bg-muted">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        <CardFooter className="pt-4 flex flex-col">
          {messages.length <= 1 && (
            <div className="flex overflow-x-scroll gap-5 w-full">
              {suggestedQuestions?.map((suggestedQuestion, index) => (
                <p
                  className="border p-2 border-gray-400 rounded-md cursor-pointer text-sm"
                  onClick={() => {
                    handleSendMessage(suggestedQuestion);
                  }}
                  key={suggestedQuestion + index}
                >
                  {suggestedQuestion}
                </p>
              ))}
            </div>
          )}
          <form
            className="flex w-full items-center space-x-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <Input
              placeholder="Ask a question about your finances..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button type="button" size="icon" variant="outline">
              <Mic className="h-4 w-4" />
            </Button>
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || loading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AIAssistant;
