import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Send, 
  Paperclip, 
  Bot, 
  User, 
  ChevronDown, 
  ChevronUp,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { Layout } from "@/components/Layout";

interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: Date;
  agent?: string;
  reasoning?: string;
  trustScore?: number;
  status?: "processing" | "complete" | "error";
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI Agent Assistant. I can help you with legal document analysis, research, and compliance checks. How can I assist you today?",
      sender: "agent",
      timestamp: new Date(Date.now() - 300000),
      agent: "Legal Assistant Pro",
      trustScore: 96.5,
      status: "complete"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [expandedReasoning, setExpandedReasoning] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    "Analyze this contract for risks",
    "Check compliance with GDPR",
    "Summarize key legal points",
    "Review document for accuracy"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      status: "complete"
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I've analyzed your request. Based on my evaluation, I can provide you with a comprehensive analysis. Let me break down the key points and considerations for you.",
        sender: "agent",
        timestamp: new Date(),
        agent: "Legal Assistant Pro",
        trustScore: 94.2,
        reasoning: "My analysis involved: 1) Document structure evaluation 2) Risk assessment based on legal precedents 3) Compliance verification against current regulations 4) Cross-reference with similar cases in my knowledge base",
        status: "complete"
      };
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 95) return "text-success";
    if (score >= 85) return "text-warning";
    return "text-destructive";
  };

  return (
    <Layout>
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <div className="border-b border-border p-4 bg-card">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">AI Agent Chat</h1>
              <p className="text-sm text-muted-foreground">Interact with certified AI agents</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-success-muted text-success-foreground">
                <CheckCircle className="h-3 w-3 mr-1" />
                Agent Active
              </Badge>
              <Badge variant="secondary">Legal Assistant Pro</Badge>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div key={message.id} className="animate-fade-in">
                <div className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {message.sender === "agent" && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shrink-0">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  
                  <div className={`max-w-[70%] space-y-2 ${message.sender === "user" ? "order-1" : ""}`}>
                    <Card className={`${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-card"}`}>
                      <CardContent className="p-3">
                        <p className="text-sm">{message.content}</p>
                        
                        {message.sender === "agent" && message.reasoning && (
                          <div className="mt-3 pt-3 border-t border-border">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setExpandedReasoning(
                                expandedReasoning === message.id ? null : message.id
                              )}
                              className="p-0 h-auto text-xs text-muted-foreground hover:text-foreground"
                            >
                              View reasoning
                              {expandedReasoning === message.id ? (
                                <ChevronUp className="h-3 w-3 ml-1" />
                              ) : (
                                <ChevronDown className="h-3 w-3 ml-1" />
                              )}
                            </Button>
                            
                            {expandedReasoning === message.id && (
                              <div className="mt-2 p-2 bg-muted rounded text-xs text-muted-foreground">
                                {message.reasoning}
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    
                    <div className={`flex items-center gap-2 text-xs text-muted-foreground ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}>
                      <Clock className="h-3 w-3" />
                      <span>{formatTime(message.timestamp)}</span>
                      
                      {message.agent && (
                        <>
                          <Separator orientation="vertical" className="h-3" />
                          <span>{message.agent}</span>
                        </>
                      )}
                      
                      {message.trustScore && (
                        <>
                          <Separator orientation="vertical" className="h-3" />
                          <span className={getTrustScoreColor(message.trustScore)}>
                            Trust: {message.trustScore}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {message.sender === "user" && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 animate-fade-in">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </div>
                <Card className="bg-card">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: "0.2s"}} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: "0.4s"}} />
                      <span className="ml-2 text-sm text-muted-foreground">Agent is thinking...</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Quick Replies */}
        <div className="border-t border-border p-4 bg-card">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {quickReplies.map((reply, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs"
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-border p-4 bg-card">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <Button variant="outline" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message here..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="pr-12"
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}