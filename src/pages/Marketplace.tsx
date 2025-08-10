import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Star, 
  Award, 
  ExternalLink, 
  Eye,
  Shield,
  Zap,
  Users,
  TrendingUp
} from "lucide-react";
import { Layout } from "@/components/Layout";
import agentLegal from "@/assets/agent-legal.jpg";
import agentSupport from "@/assets/agent-support.jpg";
import agentResearch from "@/assets/agent-research.jpg";

interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  certification: "gold" | "silver" | "bronze";
  trustScore: number;
  responseTime: string;
  users: number;
  rating: number;
  skills: string[];
  avatar: string;
  website: string;
  github: string;
}

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCertification, setSelectedCertification] = useState("all");

  const agents: Agent[] = [
    {
      id: "1",
      name: "Legal Assistant Pro",
      description: "Advanced AI for legal document analysis, contract review, and compliance checking with GDPR and enterprise policy support.",
      category: "Legal",
      certification: "gold",
      trustScore: 96.5,
      responseTime: "0.8s",
      users: 1247,
      rating: 4.9,
      skills: ["Contract Analysis", "GDPR Compliance", "Risk Assessment", "Legal Research"],
      avatar: agentLegal,
      website: "https://legalassistant.ai",
      github: "https://github.com/legal-ai/assistant"
    },
    {
      id: "2",
      name: "Customer Support Bot",
      description: "Intelligent customer service agent with multilingual support and sentiment analysis for enhanced user experience.",
      category: "Customer Service",
      certification: "silver",
      trustScore: 89.2,
      responseTime: "0.5s",
      users: 892,
      rating: 4.7,
      skills: ["Multilingual Support", "Sentiment Analysis", "Ticket Routing", "FAQ Management"],
      avatar: agentSupport,
      website: "https://supportbot.ai",
      github: "https://github.com/support-ai/bot"
    },
    {
      id: "3",
      name: "Research Assistant",
      description: "Comprehensive research and data analysis tool with academic paper synthesis and fact-checking capabilities.",
      category: "Research",
      certification: "gold",
      trustScore: 91.8,
      responseTime: "1.2s",
      users: 634,
      rating: 4.8,
      skills: ["Academic Research", "Data Analysis", "Fact Checking", "Citation Management"],
      avatar: agentResearch,
      website: "https://research-ai.com",
      github: "https://github.com/research-ai/assistant"
    },
    {
      id: "4",
      name: "Document Analyzer",
      description: "Specialized in document processing, OCR, and content extraction with enterprise security features.",
      category: "Document Processing",
      certification: "silver",
      trustScore: 87.4,
      responseTime: "1.5s",
      users: 421,
      rating: 4.6,
      skills: ["OCR Processing", "Content Extraction", "Document Classification", "Metadata Analysis"],
      avatar: agentLegal,
      website: "https://docanalyzer.ai",
      github: "https://github.com/doc-ai/analyzer"
    },
    {
      id: "5",
      name: "Financial Advisor AI",
      description: "Expert financial analysis and advisory services with real-time market data integration and risk modeling.",
      category: "Finance",
      certification: "bronze",
      trustScore: 84.1,
      responseTime: "0.9s",
      users: 312,
      rating: 4.5,
      skills: ["Market Analysis", "Risk Modeling", "Portfolio Management", "Compliance Checking"],
      avatar: agentSupport,
      website: "https://financeai.com",
      github: "https://github.com/finance-ai/advisor"
    },
    {
      id: "6",
      name: "Code Review Assistant",
      description: "Automated code review and security analysis with best practices enforcement and vulnerability detection.",
      category: "Development",
      certification: "gold",
      trustScore: 93.7,
      responseTime: "2.1s",
      users: 756,
      rating: 4.9,
      skills: ["Code Analysis", "Security Scanning", "Best Practices", "Vulnerability Detection"],
      avatar: agentResearch,
      website: "https://codereviewer.ai",
      github: "https://github.com/code-ai/reviewer"
    }
  ];

  const categories = ["all", "Legal", "Customer Service", "Research", "Document Processing", "Finance", "Development"];
  const certifications = ["all", "gold", "silver", "bronze"];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || agent.category === selectedCategory;
    const matchesCertification = selectedCertification === "all" || agent.certification === selectedCertification;
    
    return matchesSearch && matchesCategory && matchesCertification;
  });

  const getCertificationBadge = (certification: string) => {
    const badges = {
      gold: { color: "trust-badge-gold", icon: Award, label: "Gold Certified" },
      silver: { color: "trust-badge-silver", icon: Award, label: "Silver Certified" },
      bronze: { color: "trust-badge-bronze", icon: Award, label: "Bronze Certified" }
    };
    
    const badge = badges[certification as keyof typeof badges];
    const Icon = badge.icon;
    
    return (
      <Badge className={`${badge.color} text-xs font-medium`}>
        <Icon className="h-3 w-3 mr-1" />
        {badge.label}
      </Badge>
    );
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 95) return "text-success";
    if (score >= 85) return "text-warning";
    return "text-destructive";
  };

  return (
    <Layout>
      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Agent Marketplace</h1>
            <p className="text-muted-foreground">
              Discover and deploy certified AI agents for your organization
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search agents, skills, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCertification} onValueChange={setSelectedCertification}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Certification" />
                </SelectTrigger>
                <SelectContent>
                  {certifications.map(cert => (
                    <SelectItem key={cert} value={cert}>
                      {cert === "all" ? "All Levels" : `${cert.charAt(0).toUpperCase()}${cert.slice(1)}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAgents.length} of {agents.length} agents
          </p>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <Card key={agent.id} className="card-interactive group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={agent.avatar} 
                      alt={agent.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{agent.category}</p>
                    </div>
                  </div>
                  {getCertificationBadge(agent.certification)}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-sm line-clamp-3">
                  {agent.description}
                </CardDescription>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 py-3 border-y border-border">
                  <div className="text-center">
                    <div className={`text-lg font-semibold ${getTrustScoreColor(agent.trustScore)}`}>
                      {agent.trustScore}%
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <Shield className="h-3 w-3" />
                      Trust Score
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{agent.responseTime}</div>
                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <Zap className="h-3 w-3" />
                      Response Time
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{agent.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{agent.users.toLocaleString()} users</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>Active</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Key Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {agent.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {agent.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{agent.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1 gradient-primary">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Go to Agent
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">No agents found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse all categories
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedCertification("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}