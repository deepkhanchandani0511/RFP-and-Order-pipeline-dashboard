
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Bot, User, X, Minimize2, Maximize2, BarChart3, FileText, Users, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  category?: 'dashboard' | 'pipeline' | 'analytics' | 'general';
}

interface ChatBotProps {
  context: 'dashboard' | 'pipeline' | 'analytics' | 'general';
}

const ChatBot = ({ context }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: getWelcomeMessage(context),
      sender: 'bot',
      timestamp: new Date(),
      category: context
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  function getWelcomeMessage(ctx: string): string {
    switch (ctx) {
      case 'dashboard':
        return "🎯 Welcome to your RFP Analytics Assistant! I can provide detailed insights on KPIs, conversion rates, revenue trends, team performance, and strategic recommendations. What specific metrics would you like to explore?";
      case 'pipeline':
        return "📊 Hello! I'm your Pipeline Intelligence Assistant. I can analyze RFP statuses, predict bottlenecks, suggest optimization strategies, track client interactions, and provide deadline management. What pipeline insights do you need?";
      case 'analytics':
        return "📈 Hi! I'm your Advanced Analytics Companion. I can deep-dive into performance trends, competitor analysis, market insights, forecasting models, and ROI calculations. What analysis would you like me to perform?";
      default:
        return "🤖 Welcome! I'm your AI-powered RFP Management Assistant with advanced capabilities in data analysis, strategic planning, and performance optimization. How can I help you today?";
    }
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      category: context
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Enhanced AI response with more detailed information
    setTimeout(() => {
      const botResponse = generateAdvancedBotResponse(inputText, context);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        category: context
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAdvancedBotResponse = (input: string, ctx: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Enhanced context-specific responses with detailed analysis
    if (ctx === 'dashboard') {
      if (lowerInput.includes('conversion') || lowerInput.includes('rate')) {
        return `📊 **Conversion Rate Deep Analysis:**

Current Performance: 67.5% (↑5.2% QoQ)
Industry Benchmark: 59.3% (You're outperforming by 8.2%)

**Team Breakdown:**
• Sales_A: 75.0% (+2.1% MoM) - Top performer
• Sales_C: 66.7% (+1.8% MoM) - Steady growth
• Sales_B: 58.3% (-0.5% MoM) - Needs attention

**Key Insights:**
✅ Manufacturing sector: 72% conversion (highest)
✅ Average deal closure: 14.3 days (improved by 2.1 days)
⚠️ Technology sector: 68% (opportunity for growth)

**Recommendations:**
1. Replicate Sales_A's approach across teams
2. Focus more resources on Manufacturing prospects
3. Implement automated follow-up for Technology sector

Would you like me to analyze specific factors driving Sales_A's success?`;
      }
      
      if (lowerInput.includes('revenue') || lowerInput.includes('value') || lowerInput.includes('money')) {
        return `💰 **Revenue & Pipeline Value Analysis:**

**Current Financial Status:**
• Total Pipeline Value: $3.24M (+12.5% QoQ)
• Converted Revenue: $1.82M (56.2% of pipeline)
• Average Deal Size: $47.5K (+12.0% YoY)
• Revenue Run Rate: $7.3M annually

**Sector Performance:**
🏭 Manufacturing: $1.2M (37% of total, 72% win rate)
💻 Technology: $0.89M (27% of total, 68% win rate)
🏥 Healthcare: $0.65M (20% of total, 65% win rate)
🏦 Finance: $0.35M (11% of total, 58% win rate)
🛒 Retail: $0.15M (5% of total, 62% win rate)

**Forecasting:**
📈 Q1 Projection: $2.1M (based on current trends)
📊 Risk-adjusted Pipeline: $2.8M (86% confidence)
⚡ High-probability deals: $1.9M (>80% win probability)

**Strategic Insights:**
• Manufacturing sector ROI: 340% (highest)
• Technology deals close 23% faster than average
• Healthcare has highest lifetime value potential

Need specific sector analysis or forecasting scenarios?`;
      }
      
      if (lowerInput.includes('team') || lowerInput.includes('performance')) {
        return `👥 **Comprehensive Team Performance Analysis:**

**Individual Performance Matrix:**
🥇 **Sales_A Team (Sarah Johnson)**
• Conversion Rate: 75.0% (Industry leader level)
• Avg Response Time: 1.2 days (exceptional)
• Client Satisfaction: 94% (top-tier)
• Revenue Generated: $685K YTD
• Specialties: Manufacturing, Enterprise deals

🥈 **Sales_C Team (Michael Chen)**
• Conversion Rate: 66.7% (solid performer)
• Avg Response Time: 2.1 days (good)
• Client Satisfaction: 87% (above average)
• Revenue Generated: $523K YTD
• Specialties: Technology, Mid-market

🥉 **Sales_B Team (Jennifer Davis)**
• Conversion Rate: 58.3% (needs improvement)
• Avg Response Time: 3.4 days (below target)
• Client Satisfaction: 78% (requires attention)
• Revenue Generated: $394K YTD
• Challenges: Follow-up timing, proposal quality

**Team Development Recommendations:**
1. Cross-training: Have Sales_A mentor Sales_B team
2. Response time optimization for Sales_B
3. Client relationship management training
4. Proposal template standardization

Would you like detailed coaching plans for underperforming team members?`;
      }
    } 
    
    else if (ctx === 'pipeline') {
      if (lowerInput.includes('status') || lowerInput.includes('rfp') || lowerInput.includes('pipeline')) {
        return `📋 **Real-Time Pipeline Status & Intelligence:**

**Active RFPs Overview (8 Total):**

🔄 **Pending Quotation (2 RFPs)**
• RFP005 - Gamma Corp: $45K, Due: Tomorrow (HIGH PRIORITY)
• RFP012 - Delta Systems: $32K, Due: 3 days

⏳ **Awaiting Client Decision (1 RFP)**
• RFP009 - Echo Industries: $67K, Pending 5 days (Follow-up needed)

🏭 **In Production (2 RFPs)**
• RFP003 - Alpha Manufacturing: $89K, 60% complete
• RFP008 - Beta Solutions: $54K, 85% complete

✅ **Ready for Delivery (3 RFPs)**
• RFP001 - Apex Corp: $76K (Quality check complete)
• RFP004 - Zenith Ltd: $43K (Packaging in progress)
• RFP011 - Nova Industries: $38K (Awaiting logistics)

**Critical Alerts:**
🚨 RFP007 - Beta Industries: $75K, 7 days overdue (URGENT ACTION REQUIRED)
⚠️ RFP005 - Gamma Corp: Response due in 18 hours
⚠️ RFP009 - Echo Industries: No client contact for 5 days

**Pipeline Health Metrics:**
• Average Quote Time: 2.8 days (Target: 2.0 days)
• Client Decision Time: 5.2 days (Industry avg: 6.1 days)
• Production Efficiency: 94% on-time delivery
• Overall Pipeline Velocity: +15% improvement

**Next Actions:**
1. Immediate follow-up on RFP007
2. Expedite RFP005 quotation
3. Client check-in for RFP009

Need detailed analysis on any specific RFP?`;
      }
      
      if (lowerInput.includes('delay') || lowerInput.includes('late') || lowerInput.includes('overdue')) {
        return `⏰ **Delay Analysis & Optimization Strategies:**

**Current Delay Metrics:**
• Average Quotation Delay: 0.8 days (vs 2-day target)
• Client Response Delays: 5.2 days average
• Production Delays: 1.2% of projects (excellent)

**Root Cause Analysis:**
🔍 **Primary Delay Factors:**
1. Technical Specification Clarification: 34% of delays
2. Pricing Approval Process: 28% of delays
3. Resource Availability: 22% of delays
4. Client Communication Gaps: 16% of delays

**Sector-Specific Patterns:**
• Manufacturing: Avg 1.2 days (fastest)
• Technology: Avg 2.1 days (standard)
• Healthcare: Avg 3.4 days (compliance-heavy)
• Finance: Avg 2.8 days (approval-intensive)

**Predictive Insights:**
📊 Risk Factors Identified:
• RFPs >$50K: 2.3x more likely to have delays
• New clients: 1.8x longer response times
• Multi-department RFPs: +40% complexity factor

**Optimization Recommendations:**
1. Implement pre-approval matrix for <$25K deals
2. Create technical specification templates
3. Establish dedicated client liaison for >$50K deals
4. Automated milestone tracking system

**Process Improvements:**
✅ Quick-win opportunities: -1.2 days average response time
✅ Template standardization: -30% specification delays
✅ Automated notifications: -25% communication gaps

Want me to create a detailed optimization roadmap?`;
      }
    }
    
    else if (ctx === 'analytics') {
      if (lowerInput.includes('trend') || lowerInput.includes('forecast') || lowerInput.includes('prediction')) {
        return `📈 **Advanced Trend Analysis & Forecasting:**

**Market Trend Analysis:**
📊 **Historical Performance (12-month trend):**
• Win Rate Trend: 62.3% → 67.5% (+5.2% improvement)
• Deal Size Growth: $42.3K → $47.5K (+12.3% growth)
• Pipeline Velocity: 18.4 → 16.2 days (-2.2 days faster)

**Predictive Modeling Results:**
🔮 **Q1 2024 Forecast (95% confidence interval):**
• Expected Win Rate: 69.2% ± 2.1%
• Projected Revenue: $2.1M - $2.4M
• Deal Volume: 44-52 closed deals
• Average Deal Size: $48.5K - $51.2K

**Sector Projections:**
🏭 Manufacturing: +18% growth (strongest performer)
💻 Technology: +12% growth (steady expansion)
🏥 Healthcare: +8% growth (regulatory stabilization)
🏦 Finance: +5% growth (conservative outlook)

**Market Intelligence:**
📊 **Competitive Landscape:**
• Your market share: 8.4% (↑1.2% YoY)
• Top competitor gap: -2.3% (closing fast)
• Pricing advantage: 7.8% below market average
• Quality score: 4.7/5.0 (industry-leading)

**Strategic Opportunities:**
🎯 **High-Impact Areas:**
1. Manufacturing expansion: +$400K potential
2. Enterprise deals focus: +35% average deal size
3. Recurring revenue models: +45% lifetime value
4. Geographic expansion: 3 new markets identified

**Risk Factors:**
⚠️ Market saturation in Technology sector (6-month horizon)
⚠️ New competitor entry in Manufacturing (Q2 2024)
⚠️ Economic headwinds affecting deal sizes

Want detailed market entry strategies or risk mitigation plans?`;
      }
    }

    // Enhanced general responses
    if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
      return `🤖 **Advanced AI Capabilities for ${ctx.charAt(0).toUpperCase() + ctx.slice(1)}:**

**Real-Time Analysis:**
• Live performance monitoring & alerts
• Predictive analytics & forecasting
• Competitive intelligence tracking
• Market trend identification

**Strategic Planning:**
• Growth opportunity identification
• Risk assessment & mitigation
• Resource optimization recommendations
• ROI calculation & planning

**Operational Excellence:**
• Process automation suggestions
• Workflow optimization analysis
• Performance benchmarking
• Quality improvement insights

**Custom Reporting:**
• Executive dashboards creation
• KPI tracking & visualization
• Trend analysis reports
• Client-specific insights

**Actionable Intelligence:**
• Next-best-action recommendations
• Priority task identification
• Resource allocation optimization
• Timeline & milestone planning

Ask me specific questions like:
• "What's driving our conversion rate changes?"
• "Which clients have the highest lifetime value?"
• "What market opportunities should we pursue?"
• "How can we optimize our pricing strategy?"

I can provide detailed analysis on any aspect of your RFP operations!`;
    }

    // Default enhanced response
    return `🧠 **Intelligent Analysis Request:**

I understand you're looking for insights about "${input}". Let me provide you with comprehensive analysis:

**Data Processing:** Analyzing your request across multiple dimensions...

**Available Insights for "${input}":**
• Historical performance data analysis
• Predictive modeling capabilities  
• Competitive benchmarking
• Market trend evaluation
• Strategic recommendations

**For more detailed analysis, try asking:**
• "Show me detailed metrics for [specific area]"
• "What trends do you see in [specific domain]?"
• "How can I improve [specific process]?"
• "What opportunities exist in [specific market]?"

**I can provide:**
📊 Quantitative analysis with specific numbers
📈 Trend identification with forecasting
💡 Strategic recommendations with action steps
⚡ Real-time insights with predictive elements

What specific aspect would you like me to analyze in detail?`;
  };

  const getContextIcon = () => {
    switch (context) {
      case 'dashboard': return <BarChart3 className="w-4 h-4" />;
      case 'pipeline': return <FileText className="w-4 h-4" />;
      case 'analytics': return <Users className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const getContextColor = () => {
    switch (context) {
      case 'dashboard': return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'pipeline': return 'bg-gradient-to-r from-green-500 to-green-600';
      case 'analytics': return 'bg-gradient-to-r from-purple-500 to-purple-600';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg ${getContextColor()} hover:opacity-90 z-50 animate-pulse`}
      >
        {getContextIcon()}
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 w-96 shadow-2xl z-50 ${isMinimized ? 'h-16' : 'h-[500px]'} border-2`}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between bg-gradient-to-r from-slate-50 to-slate-100">
        <div className="flex items-center space-x-2">
          <div className={`p-1 rounded-full ${getContextColor()}`}>
            <Bot className="w-4 h-4 text-white" />
          </div>
          <CardTitle className="text-lg font-bold">AI Assistant</CardTitle>
          <Badge variant="secondary" className="text-xs font-semibold">
            {context.charAt(0).toUpperCase() + context.slice(1)} Expert
          </Badge>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 p-0"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[430px]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[350px] bg-gradient-to-b from-white to-slate-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && (
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-full">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {message.sender === 'user' && <User className="w-4 h-4 mt-0.5" />}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-lg max-w-[80%] border border-gray-200 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-full">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">Analyzing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t bg-gray-50">
            <div className="flex space-x-2">
              <Input
                placeholder={`Ask detailed questions about your ${context} data...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 border-2 focus:border-blue-400"
              />
              <Button 
                onClick={handleSendMessage} 
                size="sm" 
                className="px-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ChatBot;
