import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Bot, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Play,
  Bell
} from "lucide-react";
import { Layout } from "@/components/Layout";

export default function Dashboard() {
  const metrics = [
    {
      title: "Active Agents",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: Bot,
      description: "Currently deployed"
    },
    {
      title: "Trust Score",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: Shield,
      description: "Average across all agents"
    },
    {
      title: "Hallucination Rate",
      value: "2.8%",
      change: "-0.5%",
      trend: "down",
      icon: AlertTriangle,
      description: "Last 24 hours"
    },
    {
      title: "Policy Compliance",
      value: "98.7%",
      change: "+0.3%",
      trend: "up",
      icon: CheckCircle,
      description: "Current compliance rate"
    }
  ];

  const recentEvaluations = [
    { agent: "Legal Assistant Pro", score: 96.5, status: "passed", time: "2 minutes ago" },
    { agent: "Document Analyzer", score: 89.2, status: "warning", time: "5 minutes ago" },
    { agent: "Customer Support Bot", score: 94.8, status: "passed", time: "12 minutes ago" },
    { agent: "Research Assistant", score: 91.3, status: "passed", time: "18 minutes ago" },
  ];

  const alerts = [
    { message: "High hallucination rate detected in Legal Assistant Pro", severity: "warning", time: "5 min ago" },
    { message: "Policy violation: Unauthorized data access attempt", severity: "critical", time: "12 min ago" },
    { message: "New agent certification completed", severity: "info", time: "1 hour ago" },
  ];

  return (
    <Layout>
      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Monitor your AI agents and evaluation metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button className="gradient-primary">
              <Play className="h-4 w-4 mr-2" />
              Run Evaluation
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <Card key={metric.title} className="card-interactive">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1 text-success" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1 text-success" />
                  )}
                  <span className={metric.trend === "up" ? "text-success" : "text-success"}>
                    {metric.change}
                  </span>
                  <span className="ml-1">{metric.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Test Prompt Section */}
          <div className="lg:col-span-2">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Test Agent Performance</CardTitle>
                <CardDescription>
                  Input a test prompt to evaluate agent responses and view metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Test Prompt</label>
                  <Input 
                    placeholder="Enter your test prompt here..."
                    className="min-h-[100px] resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <Button className="gradient-primary">
                    Run Evaluation
                  </Button>
                  <Button variant="outline">
                    Save Prompt
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Evaluations */}
            <Card className="card-elevated mt-6">
              <CardHeader>
                <CardTitle>Recent Evaluations</CardTitle>
                <CardDescription>Latest agent performance assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentEvaluations.map((evaluation, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <Bot className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{evaluation.agent}</p>
                          <p className="text-sm text-muted-foreground">{evaluation.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{evaluation.score}%</span>
                        <Badge 
                          variant={evaluation.status === "passed" ? "default" : "secondary"}
                          className={evaluation.status === "passed" ? "bg-success text-success-foreground" : ""}
                        >
                          {evaluation.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts & Notifications */}
          <div>
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Alerts & Notifications</CardTitle>
                <CardDescription>Important system notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert, index) => (
                    <div key={index} className="p-3 rounded-lg border border-border">
                      <div className="flex items-start gap-3">
                        <div className={`h-2 w-2 rounded-full mt-2 ${
                          alert.severity === "critical" ? "bg-destructive" :
                          alert.severity === "warning" ? "bg-warning" : "bg-primary"
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm">{alert.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-elevated mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Agents
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Review Policies
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}